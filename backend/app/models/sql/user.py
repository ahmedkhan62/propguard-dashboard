from sqlalchemy import Column, Integer, String, Boolean, DateTime, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="USER") # USER, FOUNDER, STAFF
    is_suspended = Column(Boolean, default=False)
    last_login = Column(DateTime(timezone=True), nullable=True)
    session_start = Column(DateTime(timezone=True), nullable=True) # Tracks start of current session
    last_active = Column(DateTime(timezone=True), nullable=True) # For Online/Offline status
    requires_reauth = Column(Boolean, default=False) # For Force Logout
    
    # Granular Permissions Matrix
    # Options: view_users, support_reply, view_complaints, view_feedback, system_logs, send_announcements, view_reports
    permissions = Column(JSON, default={})
    
    # Tier Management
    subscription_tier = Column(String, default="standard") # standard, elite, ultra
    max_accounts_limit = Column(Integer, default=1)
    
    # Growth & Onboarding
    is_onboarded = Column(Boolean, default=False)
    
    # Relationships - Insights System
    trading_goals = relationship("TradingGoal", back_populates="user")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
