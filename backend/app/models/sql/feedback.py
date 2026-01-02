from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.db.session import Base
from sqlalchemy.orm import relationship

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String) # IDEA, COMPLAINT
    title = Column(String)
    description = Column(Text)
    category = Column(String, nullable=True) # UI, Risk, Reports, AI, Performance, Other
    severity = Column(String, nullable=True) # Low, Medium, High
    status = Column(String, default="RECEIVED") # RECEIVED, UNDER_REVIEW, PLANNED, RESOLVED, REJECTED
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="feedback")
