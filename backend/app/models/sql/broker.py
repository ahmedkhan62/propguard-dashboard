from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class BrokerAccount(Base):
    __tablename__ = "broker_accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Platform Info
    platform = Column(String) # mt4, mt5
    provider = Column(String) # metaapi
    
    # Credentials
    account_id = Column(String) # MetaApi Account ID
    name = Column(String) # User friendly name
    token_encrypted = Column(String) # We will store encrypted token here
    
    # State
    is_active = Column(Boolean, default=False) # Selected for dashboard
    connection_status = Column(String, default="disconnected") # connected, disconnected, error
    
    # Notification Preferences
    email_alerts_enabled = Column(Boolean, default=True)
    telegram_alerts_enabled = Column(Boolean, default=False)
    telegram_chat_id = Column(String, nullable=True)
    last_notification_at = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Risk Parameters (Dynamic)
    daily_loss_limit_pct = Column(Float, default=5.0)
    max_drawdown_limit_pct = Column(Float, default=10.0)
    max_daily_trades = Column(Integer, default=50)
    max_lot_size = Column(Float, default=10.0)
    news_trading_allowed = Column(Boolean, default=True)
    preset_name = Column(String, nullable=True) # FTMO, E8, etc.

    # Relationship
    owner = relationship("User", backref="broker_accounts")
