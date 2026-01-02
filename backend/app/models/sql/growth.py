from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class UserOnboarding(Base):
    __tablename__ = "user_onboarding"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, index=True)
    
    # Experience
    experience_level = Column(String) # Beginner, Intermediate, Advanced
    years_trading = Column(String) # <1, 1-3, 3-5, 5+
    
    # Demographics (New)
    date_of_birth = Column(DateTime)
    country = Column(String)
    
    # Preferences
    preferred_markets = Column(JSON) # ["Forex", "Crypto", ...]
    trading_style = Column(String) # Scalping, Intraday, Swing
    strategy_type = Column(String) # Manual, Semi-Auto, etc.
    risk_appetite = Column(String) # Low, Medium, High
    
    # Goals
    primary_goal = Column(String) # Funding, Consistency, etc.
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", backref="onboarding")

class VisitorSurvey(Base):
    __tablename__ = "visitor_surveys"
    
    id = Column(Integer, primary_key=True, index=True)
    ip_address = Column(String, index=True)
    country = Column(String)
    
    interest_level = Column(String) # High, Medium, Low
    experience_category = Column(String) # Beginner, Pro, etc.
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class VisitorLog(Base):
    __tablename__ = "visitor_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    ip_address = Column(String, index=True) # Anonymized or hashed if needed
    country = Column(String)
    device_type = Column(String) # Mobile, Desktop
    source = Column(String) # Direct, Referral, Campaign
    landing_page = Column(String)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ReferralCode(Base):
    __tablename__ = "referral_codes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    code = Column(String, unique=True, index=True)
    
    usage_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", backref="referral_code")

class ReferralConversion(Base):
    __tablename__ = "referral_conversions"
    
    id = Column(Integer, primary_key=True, index=True)
    referrer_code_id = Column(Integer, ForeignKey("referral_codes.id"))
    referred_user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    
    purchased_plan = Column(String)
    amount_paid = Column(Float)
    
    status = Column(String, default="COMPLETED") # COMPLETED, REFUNDED
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    referrer_code = relationship("ReferralCode", backref="conversions")
    referred_user = relationship("User", foreign_keys=[referred_user_id])
