import logging
from datetime import datetime, timedelta
from typing import Optional, List
from sqlalchemy.orm import Session
from ..models.sql.broker import BrokerAccount
from ..models.sql.user import User

logger = logging.getLogger(__name__)

class NotificationService:
    """
    Handles multi-channel alerts (Email, Telegram) for risk events.
    Includes cooldown logic to prevent notification fatigue.
    """
    
    COOLDOWN_MINUTES = 60 # Default cooldown to prevent spam

    @staticmethod
    async def send_risk_alert(
        db: Session, 
        account: BrokerAccount, 
        status: str, 
        violations: List[str]
    ):
        if status not in ['critical', 'breach']:
            return

        # 1. Check Cooldown
        if account.last_notification_at:
            elapsed = datetime.utcnow() - account.last_notification_at.replace(tzinfo=None)
            if elapsed < timedelta(minutes=NotificationService.COOLDOWN_MINUTES):
                logger.info(f"Notification suppressed for account {account.id} (Cooldown active)")
                return

        # 2. Identify User
        user = db.query(User).filter(User.id == account.user_id).first()
        if not user:
            logger.error(f"User not found for account {account.id}")
            return

        # 3. Dispatch Email (Mock for now)
        if account.email_alerts_enabled:
            await NotificationService._dispatch_email(user.email, status, violations)

        # 4. Dispatch Telegram (Mock for now)
        if account.telegram_alerts_enabled and account.telegram_chat_id:
            await NotificationService._dispatch_telegram(account.telegram_chat_id, status, violations)

        # 5. Update last notification timestamp
        account.last_notification_at = datetime.utcnow()
        try:
            db.commit()
        except Exception as e:
            db.rollback()
            logger.error(f"Failed to update last_notification_at: {e}")

    @staticmethod
    async def _dispatch_email(email: str, status: str, violations: List[str]):
        subject = f"RISKLOCK ALERT: Account {status.upper()}"
        body = f"RiskLock has detected a {status} state.\n\nViolations:\n" + "\n".join([f"- {v}" for v in violations])
        
        # In production, use SMTP or SendGrid/AWS SES
        logger.warning(f"SIMULATED EMAIL to {email}:\nSubject: {subject}\n{body}")

    @staticmethod
    async def _dispatch_telegram(chat_id: str, status: str, violations: List[str]):
        message = f"🚨 *RISKLOCK ALERT*\n\nStatus: *{status.upper()}*\n\n" + "\n".join([f"• {v}" for v in violations])
        
        # In production, use a library like python-telegram-bot or direct HTTP request to Telegram Bot API
        logger.warning(f"SIMULATED TELEGRAM to {chat_id}:\n{message}")

notification_service = NotificationService()
