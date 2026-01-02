from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    broker_account_id = Column(Integer, ForeignKey("broker_accounts.id"), nullable=True)
    
    action = Column(String) # rule_change, breach, connection, login
    category = Column(String) # security, risk, system
    
    # Flexible storage for changes
    details = Column(JSON) # {"field": "daily_loss_limit_pct", "old": 5.0, "new": 4.5}
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", backref="audit_logs")
    broker = relationship("BrokerAccount", backref="audit_logs")
