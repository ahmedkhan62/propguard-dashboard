from typing import Dict, List, Any
from sqlalchemy.orm import Session
from ..models.sql.trade import Trade
from ..models.sql.user import User

class RiskEngine:
    def __init__(self):
        # Default Prop Firm Rules
        self.rules = {
            "max_daily_loss": 5000.0,  # $5,000
            "max_overall_loss": 10000.0, # $10,000
            "max_lot_size": 10.0,
            "prohibited_news_trading": True
        }

    def get_daily_stats(self, trades: List[Dict]) -> Dict:
        """
        Calculates daily statistics from the provided trades list.
        NOTE: This only considers Open Trades provided in the list.
        Realized P&L for the day requires history, which is not passed here yet.
        """
        daily_profit = 0.0
        daily_volume = 0.0
        
        for t in trades:
            daily_profit += t.get("profit", 0.0)
            daily_volume += t.get("volume", 0.0)
            
        return {
            "daily_profit": daily_profit,
            "daily_volume": daily_volume,
            "trades_count": len(trades)
        }
        
    def check_risk(self, account_data: Dict, daily_stats: Dict, trades: List[Dict], db: Session = None, account_model: Any = None) -> Dict:
        """
        Evaluates the current account state against risk rules.
        Returns a Risk Report including connection status and dynamic limits.
        """
        # --- 1. Dynamic Threshold Resolution ---
        # If no account model provided, we use hardcoded defaults
        if account_model:
            balance = account_data.get("balance", 0.0)
            daily_loss_limit = balance * (account_model.daily_loss_limit_pct / 100.0)
            overall_limit = balance * (account_model.max_drawdown_limit_pct / 100.0)
            max_lot_size = account_model.max_lot_size
        else:
            daily_loss_limit = self.rules["max_daily_loss"]
            overall_limit = self.rules["max_overall_loss"]
            max_lot_size = self.rules["max_lot_size"]

        violations = []
        status = "safe" # safe, warning, critical, breach
        
        # --- 2. Trade Persistence and Validation ---
        if db:
            rule_snapshot = None
            
            for t_data in trades:
                # Basic lot size check
                if t_data.get("volume", 0) > max_lot_size:
                    violations.append(f"Excessive Lot Size: {t_data['volume']} > {max_lot_size}")
                    status = "warning"

                # 2.2 Advanced Tagging
                from datetime import datetime
                now_hour = datetime.utcnow().hour
                if 8 <= now_hour < 16: session_tag = "London"
                elif 14 <= now_hour < 22: session_tag = "New York"
                else: session_tag = "Asia"

                # Persist trade
                from ..models.sql.trade import Trade
                trade = db.query(Trade).filter(Trade.ticket == t_data["ticket"]).first()
                
                if not trade:
                    # New trade found! Create one snapshot for this run if needed
                    if not rule_snapshot and account_model:
                        from ..models.sql.risk_snapshot import RiskRuleSnapshot
                        rule_snapshot = RiskRuleSnapshot(
                            broker_account_id=account_model.id,
                            daily_loss_limit_pct=account_model.daily_loss_limit_pct,
                            max_drawdown_limit_pct=account_model.max_drawdown_limit_pct,
                            max_daily_trades=account_model.max_daily_trades,
                            max_lot_size=account_model.max_lot_size,
                            news_trading_allowed=account_model.news_trading_allowed
                        )
                        db.add(rule_snapshot)
                        db.flush() # Get ID
                        
                    trade = Trade(
                        ticket=t_data["ticket"],
                        user_id=account_model.user_id if account_model else 1,
                        symbol=t_data["symbol"],
                        type=t_data["type"],
                        volume=t_data["volume"],
                        open_price=t_data["open_price"],
                        status="OPEN",
                        session=session_tag,
                        risk_score=75, # Default base score
                        rule_snapshot_id=rule_snapshot.id if rule_snapshot else None
                    )
                    db.add(trade)
                else:
                    trade.profit = t_data.get("profit", 0.0)
                    # Deduct score if excessive volume
                    if t_data.get("volume", 0) > max_lot_size:
                        trade.risk_score = 30
                    else:
                        trade.risk_score = 90
            
            try:
                db.commit()
            except Exception as e:
                db.rollback()
                print(f"Risk Engine DB Error: {e}")

        # --- 3. Evaluate Daily Loss ---
        current_daily_loss = -daily_stats.get("daily_profit", 0)
        daily_loss_threshold = daily_loss_limit * 0.8 # Warn at 80%
        daily_loss_critical = daily_loss_limit * 0.95 # Critical at 95%
        
        if current_daily_loss >= daily_loss_limit:
            violations.append(f"Daily Loss Limit Breached: -${current_daily_loss:.2f} (Limit: ${daily_loss_limit:.2f})")
            status = "breach"
        elif current_daily_loss >= daily_loss_critical:
            violations.append(f"CRITICAL: Near Daily Loss Limit")
            status = "critical"
        elif current_daily_loss >= daily_loss_threshold:
            violations.append(f"Warning: Approaching Daily Loss Limit")
            status = "warning"
                
        # --- 4. Evaluate Overall Drawdown ---
        # Drawdown is usually measured from starting balance or equity peak.
        # For this MVP, we use the account balance as proxy for start of day/peak.
        current_equity = account_data.get("equity", 0.0)
        current_balance = account_data.get("balance", 0.0)
        total_drawdown = max(0.0, current_balance - current_equity)
        
        if total_drawdown >= overall_limit:
             violations.append(f"Max Overall Loss Breached: -${total_drawdown:.2f}")
             status = "breach"
        elif total_drawdown >= overall_limit * 0.9:
             if status != "breach": status = "critical"
             
        # --- 5. Predictive Estimates ---
        # Time to breach estimate based on daily loss velocity (per trade)
        # Simplified: if losing $X per trade and buffer is $Y, you have Y/X trades left.
        trades_count = daily_stats.get("trades_count", 0)
        avg_loss_per_trade = current_daily_loss / trades_count if trades_count > 0 and current_daily_loss > 0 else 0
        
        buffer = max(0.0, daily_loss_limit - current_daily_loss)
        trades_to_breach = int(buffer / avg_loss_per_trade) if avg_loss_per_trade > 0 else 99
        
        # --- 6. Trigger Notifications ---
        if db and account_model and status in ['critical', 'breach']:
            try:
                # Tier Gating for Telegram
                is_pro = getattr(account_model.owner, 'subscription_tier', 'free') == 'pro'
                
                from ..services.notifications import notification_service
                import asyncio
                # Run notification task in background
                asyncio.create_task(notification_service.send_risk_alert(
                    db, 
                    account_model, 
                    status, 
                    violations,
                    only_email=(not is_pro) # Add flag to only send email if not pro
                ))
            except Exception as e:
                print(f"Notification Error: {e}")

        return {
            "status": status,
            "violations": violations,
            "metrics": {
                "daily_loss": current_daily_loss,
                "daily_limit": daily_loss_limit,
                "overall_drawdown": total_drawdown,
                "overall_limit": overall_limit,
                "buffer": buffer,
                "buffer_pct": (buffer / daily_loss_limit) * 100 if daily_loss_limit > 0 else 0,
                "trades_to_breach": min(99, trades_to_breach)
            }
        }

risk_engine = RiskEngine()
