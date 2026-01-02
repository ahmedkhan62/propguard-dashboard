from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base
from .risk_snapshot import RiskRuleSnapshot

class Trade(Base):
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    ticket = Column(Integer, unique=True, index=True)
    symbol = Column(String, index=True)
    volume = Column(Float)
    type = Column(String) # BUY / SELL
    
    open_price = Column(Float)
    close_price = Column(Float, nullable=True)
    profit = Column(Float, nullable=True)
    
    open_time = Column(DateTime(timezone=True), server_default=func.now())
    close_time = Column(DateTime(timezone=True), nullable=True)
    
    status = Column(String) # OPEN / CLOSED
    
    # Advanced Journaling
    session = Column(String, nullable=True) # London, NY, Asia
    risk_pct = Column(Float, nullable=True) # % of balance risked
    risk_score = Column(Integer, nullable=True) # 1-100 safety score

    rule_snapshot_id = Column(Integer, ForeignKey("risk_rule_snapshots.id"), nullable=True)

    # Relationships
    owner = relationship("User", backref="trades")
    rule_snapshot = relationship("RiskRuleSnapshot", backref="trades")
