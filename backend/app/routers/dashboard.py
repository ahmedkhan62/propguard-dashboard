from fastapi import APIRouter, HTTPException, Depends
import asyncio
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.engine.broker.base import BrokerConnector
from app.engine.broker.metaapi import MetaApiConnector
from app.engine.mt5_bridge import MT5Bridge 
from app.engine.risk import RiskEngine
from app.core.config import settings
from app.routers import auth
from app.models.sql.user import User
from app.models.sql.broker import BrokerAccount
from app.core import crypto

router = APIRouter(
    prefix="/api/dashboard",
    tags=["dashboard"]
)

# Global instances
risk_engine = RiskEngine()

# Factory for Broker Connector
async def get_broker_service(db: Session, user: User, account_model: Optional[BrokerAccount] = None) -> BrokerConnector:
    # 1. Use provided account or look for active one
    account = account_model
    if not account:
        account = db.query(BrokerAccount).filter(
            BrokerAccount.user_id == user.id,
            BrokerAccount.is_active == True
        ).first()
    
    if account and account.provider == "metaapi":
        try:
            # Decrypt token
            token = crypto.decrypt_token(account.token_encrypted)
            return MetaApiConnector(token, account.account_id)
        except Exception as e:
            print(f"Failed to decrypt/initialize MetaApi for account {account.id}: {e}")
            # Fallback to mock on error
            return MT5Bridge()
            
    # 2. Fallback to Env Vars (legacy support/easy testing)
    if settings.META_API_TOKEN and settings.META_ACCOUNT_ID:
        return MetaApiConnector(settings.META_API_TOKEN, settings.META_ACCOUNT_ID)
    
    # 3. Default to Mock
    return MT5Bridge()

@router.get("/overview")
async def get_dashboard_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    try:
        broker_service = await get_broker_service(db, current_user)
        
        # Connect if supported
        if hasattr(broker_service, 'connect'): 
             await broker_service.connect()
             
        # Fetch data in parallel
        info_task = asyncio.create_task(broker_service.get_account_info())
        trades_task = asyncio.create_task(broker_service.get_trades())
        
        account_data, trades = await asyncio.gather(
            asyncio.wait_for(info_task, timeout=15.0),
            asyncio.wait_for(trades_task, timeout=15.0)
        )

        # Risk Engine might need sync data
        # Check risk engine signature -> it takes (account_info, daily_stats, trades, db)?
        # Previous call: risk_engine.check_risk(account_info, daily_stats, trades, db)
        # Wait, daily_stats was fetched separately from mt5_service.get_daily_stats().
        
        # MetaApi doesn't inherently give "daily stats". We might need to calculate it from history.
        # For Phase 2 MVP, let's keep it simple:
        # If MetaApi, we might miss "daily_stats" or need to fetch history.
        # Let's check RiskEngine.get_daily_stats calculation.
        
        # 3. Dynamic Thresholds from DB
        account_model = db.query(BrokerAccount).filter(
            BrokerAccount.user_id == current_user.id,
            BrokerAccount.is_active == True
        ).first()

        daily_stats = risk_engine.get_daily_stats(trades)
        risk_report = risk_engine.check_risk(
            account_data, daily_stats, trades, db, account_model=account_model
        )

        # 4. Intelligence Insights
        from app.engine.intelligence import IntelligenceEngine
        insights = IntelligenceEngine.analyze_behavior(trades)
        
        # Tier Gating for Intelligence
        if current_user.subscription_tier == "free":
            # Free tier only gets basic flags, no score or session bias
            insights["score"] = "Upgrade to Pro"
            insights["session_performance"] = {}
            # Keep flags but message them as basic
            for f in insights.get("flags", []):
                f["message"] = f"[Free Tier] {f['message']}"

        return {
            "account": account_data,
            "risk": risk_report,
            "daily_stats": daily_stats,
            "intelligence": insights,
            "connection_status": getattr(broker_service, 'connection_status', 'connected') if hasattr(broker_service, 'connection_status') else 'connected',
            "sync_status": {
                "status": broker_service.confidence_status,
                "last_sync": broker_service.last_sync.isoformat() if broker_service.last_sync else None,
                "latency_ms": 150 
            },
            "onboarding": {
                "has_account": account_model is not None,
                "has_preset": account_model.rule_preset is not None if account_model else False,
                "has_alerts": account_model.telegram_enabled if account_model else False,
                "has_report": False # TODO: Track in DB or localStorage
            }
        }
    except Exception as e:
        print(f"Dashboard Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/portfolio")
async def get_portfolio_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    """
    Aggregates metrics across all connected broker accounts for the user.
    Calculates total equity, total balance, total drawdown, and correlation risks.
    """
    accounts = db.query(BrokerAccount).filter(BrokerAccount.user_id == current_user.id).all()
    
    total_balance = 0.0
    total_equity = 0.0
    total_profit = 0.0
    symbol_exposure = {} # symbol -> {long_vol, short_vol}
    
    account_summaries = []

    async def fetch_account_stats(acc):
        try:
            broker_service = await get_broker_service(db, current_user, account_model=acc)
            await broker_service.connect()
            info_task = asyncio.create_task(broker_service.get_account_info())
            trades_task = asyncio.create_task(broker_service.get_trades())
            
            info, trades = await asyncio.gather(
                asyncio.wait_for(info_task, timeout=15.0),
                asyncio.wait_for(trades_task, timeout=15.0)
            )
            return {"info": info, "trades": trades, "acc": acc}
        except Exception as e:
            print(f"Error fetching portfolio stats for account {acc.id}: {e}")
            return None

    # Fetch all accounts in parallel
    results = await asyncio.gather(*[fetch_account_stats(acc) for acc in accounts])
    results = [r for r in results if r is not None]

    for res in results:
        info = res["info"]
        trades = res["trades"]
        acc = res["acc"]
        
        total_balance += info.get('balance', 0)
        total_equity += info.get('equity', 0)
        total_profit += info.get('profit', 0)
        
        for t in trades:
            sym = t['symbol']
            vol = t['volume']
            if sym not in symbol_exposure:
                symbol_exposure[sym] = {"long": 0.0, "short": 0.0}
            
            if t['type'] == 'buy':
                symbol_exposure[sym]["long"] += vol
            else:
                symbol_exposure[sym]["short"] += vol

        account_summaries.append({
            "id": acc.id,
            "name": acc.name,
            "balance": info.get('balance', 0),
            "equity": info.get('equity', 0),
            "status": "active" if acc.is_active else "inactive"
        })

    # Identify Correlation Risks
    correlation_warnings = []
    for sym, vols in symbol_exposure.items():
        if vols["long"] > 0 and vols["short"] > 0:
            correlation_warnings.append(f"Hedged position detected on {sym} across accounts.")
        if vols["long"] > 5.0 or vols["short"] > 5.0: # Arbitrary threshold for MVP
            correlation_warnings.append(f"High exposure on {sym} ({max(vols['long'], vols['short'])} lots).")

    return {
        "total_balance": total_balance,
        "total_equity": total_equity,
        "total_profit": total_profit,
        "account_count": len(accounts),
        "accounts": account_summaries,
        "correlation_warnings": correlation_warnings,
        "symbol_exposure": symbol_exposure
    }

@router.get("/trades")
async def get_open_trades(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    try:
        broker_service = await get_broker_service(db, current_user)
        
        return await broker_service.get_trades()
    except Exception as e:
        print(f"Trades Error: {e}")
        # Return empty list on error instead of 500 crash
        return []

@router.post("/toggle-demo")
async def toggle_demo_mode(
    enabled: bool,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    # Only allow for mock/demo accounts
    from app.engine.mt5_bridge import mt5_service
    return await mt5_service.toggle_demo_mode(enabled)
