from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base

class EmployeeActivity(Base):
    __tablename__ = "employee_activities"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("users.id"))
    
    action = Column(String) # e.g., "REPLIED_TO_CHAT", "RESOLVED_COMPLAINT"
    module = Column(String) # e.g., "SUPPORT", "FEEDBACK"
    description = Column(Text)
    
    # Action Metadata for analytics (e.g., chat_id, response_time)
    metadata_json = Column(JSON, default={})
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    employee = relationship("User", foreign_keys=[employee_id])
