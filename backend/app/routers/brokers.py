from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from app.models.sql.audit import AuditLog

from app.db.session import get_db
from app.routers import auth
from app.models.sql.user import User
from app.models.sql.broker import BrokerAccount
from app.core import crypto
from app.engine.broker.metaapi import MetaApiConnector

router = APIRouter(
    prefix="/api/brokers",
    tags=["brokers"]
)

# --- Schemas ---
class BrokerConnectRequest(BaseModel):
    platform: str # mt4, mt5
    provider: str = "metaapi"
    account_id: str
    token: str
    name: Optional[str] = None
    # Default risk settings on connect
    daily_loss_limit_pct: float = 5.0
    max_drawdown_limit_pct: float = 10.0

class RiskSettingsUpdate(BaseModel):
    preset_name: Optional[str] = None
    daily_loss_limit_pct: Optional[float] = None
    max_drawdown_limit_pct: Optional[float] = None
    max_daily_trades: Optional[int] = None
    max_lot_size: Optional[float] = None
    news_trading_allowed: Optional[bool] = None

class BrokerResponse(BaseModel):
    id: int
    platform: str
    provider: str
    account_id: str
    name: Optional[str]
    is_active: bool
    is_limited: bool = False
    connection_status: str
    created_at: datetime # Changed from str to datetime
    
    # Risk settings
    daily_loss_limit_pct: float
    max_drawdown_limit_pct: float
    max_daily_trades: int
    max_lot_size: float
    news_trading_allowed: bool
    preset_name: Optional[str] = None

    class Config:
        from_attributes = True

# --- Endpoints ---

@router.get("/presets")
def get_presets():
    """Get list of standardized rule presets."""
    import json
    import os
    path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "core", "presets.json")
    with open(path, "r") as f:
        return json.load(f)

@router.get("/", response_model=List[BrokerResponse])
def get_brokers(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    """List all connected broker accounts with tier enforcement."""
    accounts = db.query(BrokerAccount).filter(BrokerAccount.user_id == current_user.id).order_by(BrokerAccount.created_at.asc()).all()
    
    limit = current_user.max_accounts_limit
    for i, acc in enumerate(accounts):
        acc.is_limited = i >= limit
        
    return accounts

@router.post("/connect", response_model=BrokerResponse)
async def connect_broker(
    request: BrokerConnectRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    """
    Connect a new broker account.
    Verifies credentials with MetaApi before saving.
    """
    # 0. Enforce Subscription Limits
    account_count = db.query(BrokerAccount).filter(BrokerAccount.user_id == current_user.id).count()
    if account_count >= current_user.max_accounts_limit:
        raise HTTPException(
            status_code=403, 
            detail=f"Account limit reached for {current_user.subscription_tier.upper()} tier. "
                   f"Please upgrade to connect more accounts."
        )

    if request.provider != "metaapi":
        raise HTTPException(status_code=400, detail="Only MetaApi provider is supported currently.")

    # 1. Verify credentials by attempting a dry-run connection
    # Note: Creating a connector instance and checking account existence
    connector = MetaApiConnector(token=request.token, account_id=request.account_id)
    
    # We need a verification method on the connector that doesn't do a full deployment 
    # if possible, to save time/resources, but `get_account` is usually fast.
    # MetaApiConnector.get_account_info() calls connect() which calls deploy()
    # This might be slow. 
    # For now, let's try to fetch account metadata.
    
    # We need to reuse the `connect` logic or add a lighter validation.
    # Let's try to just fetch the account object from API without deploying first?
    # The existing `connect` already deploys.
    
    print(f"Verifying MetaApi credentials for {request.account_id}...")
    valid = await connector.connect()
    
    if not valid:
         raise HTTPException(status_code=400, detail="Failed to connect to MetaApi. Check credentials.")

    # 2. Encrypt Token
    encrypted_token = crypto.encrypt_token(request.token)
    
    # 3. Save to DB
    # Deactivate other accounts if we want single-active enforcement,
    # or just set this one as active.
    # implementing single-active for now for simplicity in Dashboard.
    db.query(BrokerAccount).filter(BrokerAccount.user_id == current_user.id).update({"is_active": False})
    
    new_account = BrokerAccount(
        user_id=current_user.id,
        platform=request.platform,
        provider=request.provider,
        account_id=request.account_id,
        name=request.name or f"{request.platform} - {request.account_id}",
        token_encrypted=encrypted_token,
        is_active=True,
        connection_status="connected",
        daily_loss_limit_pct=request.daily_loss_limit_pct,
        max_drawdown_limit_pct=request.max_drawdown_limit_pct
    )
    
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    
    return new_account

@router.patch("/{broker_id}/risk-settings", response_model=BrokerResponse)
async def update_risk_settings(
    broker_id: int,
    request: RiskSettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    """Update risk thresholds for a specific broker account."""
    account = db.query(BrokerAccount).filter(
        BrokerAccount.id == broker_id,
        BrokerAccount.user_id == current_user.id
    ).first()
    
    if not account:
        raise HTTPException(status_code=404, detail="Broker account not found")

    update_data = request.dict(exclude_unset=True)
    
    # 1. Handle Preset Application
    if "preset_name" in update_data:
        p_name = update_data.pop("preset_name")
        if p_name:
            import json
            import os
            path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "core", "presets.json")
            with open(path, "r") as f:
                presets = json.load(f)
            
            if p_name in presets:
                p_data = presets[p_name]
                account.preset_name = p_name
                # Application of preset values
                for k, v in p_data.items():
                    if k == "description": continue
                    if v is not None: # Only apply non-null preset values
                        setattr(account, k, v)
            else:
                account.preset_name = None
        else:
            account.preset_name = None

    # 2. Sequential Overwrites (if any)
    changes = {}
    for field, value in update_data.items():
        old_val = getattr(account, field)
        if old_val != value:
            setattr(account, field, value)
            changes[field] = {"old": old_val, "new": value}

    if changes:
        # Create Audit Log
        log = AuditLog(
            user_id=current_user.id,
            broker_account_id=account.id,
            action="rule_change",
            category="risk",
            details=changes
        )
        db.add(log)
        db.commit()
        db.refresh(account)

    return account
