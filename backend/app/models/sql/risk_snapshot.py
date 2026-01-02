from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class RiskRuleSnapshot(Base):
    __tablename__ = "risk_rule_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    broker_account_id = Column(Integer, ForeignKey("broker_accounts.id"))
    
    daily_loss_limit_pct = Column(Float)
    max_drawdown_limit_pct = Column(Float)
    max_daily_trades = Column(Integer)
    max_lot_size = Column(Float)
    news_trading_allowed = Column(Boolean, default=True)
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    broker_account = relationship("BrokerAccount", backref="risk_snapshots")
