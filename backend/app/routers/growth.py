from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from pydantic import BaseModel
from app.db.session import get_db
from app.routers.auth import get_current_user
from app.models.sql.user import User
from app.models.sql.growth import UserOnboarding, VisitorLog, ReferralCode, ReferralConversion
import secrets
import string

router = APIRouter(
    prefix="/api/growth",
    tags=["growth"],
    responses={404: {"description": "Not found"}},
)

# --- Schemas ---
from datetime import datetime

class OnboardingSchema(BaseModel):
    experience_level: str
    years_trading: str
    preferred_markets: List[str]
    trading_style: str
    strategy_type: str
    risk_appetite: str
    primary_goal: str
    # New fields
    date_of_birth: datetime
    country: str

class VisitorLogSchema(BaseModel):
    country: Optional[str] = None
    device_type: str
    source: Optional[str] = None # UTM source or referrer
    landing_page: str

class ReferralStatsSchema(BaseModel):
    code: str
    usage_count: int
    conversions: List[dict] # Simplified for now

# --- Routes ---

@router.post("/onboarding")
def submit_onboarding(data: OnboardingSchema, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Save user onboarding data and unlock dashboard."""
    if current_user.is_onboarded:
        return {"status": "Already onboarded"}
    
    # Create onboarding record
    onboarding = UserOnboarding(
        user_id=current_user.id,
        experience_level=data.experience_level,
        years_trading=data.years_trading,
        preferred_markets=data.preferred_markets,
        trading_style=data.trading_style,
        strategy_type=data.strategy_type,
        risk_appetite=data.risk_appetite,
        primary_goal=data.primary_goal,
        date_of_birth=data.date_of_birth,
        country=data.country
    )
    db.add(onboarding)
    
    # Mark user as onboarded
    current_user.is_onboarded = True
    
    # Auto-generate referral code if not exists
    if not db.query(ReferralCode).filter(ReferralCode.user_id == current_user.id).first():
        base_code = current_user.full_name.split(" ")[0].upper()[:4]
        random_suffix = ''.join(secrets.choice(string.digits) for _ in range(3))
        code = f"{base_code}{random_suffix}"
        
        # Ensure unique
        while db.query(ReferralCode).filter(ReferralCode.code == code).first():
             random_suffix = ''.join(secrets.choice(string.digits) for _ in range(3))
             code = f"{base_code}{random_suffix}"
             
        ref_code = ReferralCode(user_id=current_user.id, code=code)
        db.add(ref_code)

    db.commit()
    
    # Generate new token with updated permissions/branding
    from app.core import security
    from datetime import timedelta
    
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={
            "sub": current_user.email, 
            "user_id": current_user.id,
            "full_name": current_user.full_name,
            "subscription_tier": current_user.subscription_tier,
            "max_accounts_limit": current_user.max_accounts_limit,
            "role": current_user.role,
            "permissions": current_user.permissions,
            "is_onboarded": True 
        },
        expires_delta=access_token_expires
    )
    
    return {"status": "Onboarding complete", "access_token": access_token}

@router.post("/visit")
def log_visit(data: VisitorLogSchema, request: Request, db: Session = Depends(get_db)):
    """Log anonymous visitor data."""
    # In production, get IP from request.client.host or headers (X-Forwarded-For)
    ip = request.client.host
    
    log = VisitorLog(
        ip_address=ip,
        country=data.country or "Unknown",
        device_type=data.device_type,
        source=data.source,
        landing_page=data.landing_page
    )
@router.post("/survey")
def submit_visitor_survey(data: dict, db: Session = Depends(get_db)):
    """Save visitor survey data."""
    # Validate manually since schema is flexible or use Pydantic
    survey = VisitorSurvey(
        ip_address="0.0.0.0", # TODO: Get real IP
        country=data.get("country"),
        interest_level=data.get("interest_level"),
        experience_category=data.get("experience_category")
    )
    db.add(survey)
    db.commit()
    return {"status": "Survey recorded"}
def get_referral_info(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Get current user's referral code and stats."""
    ref_code = db.query(ReferralCode).filter(ReferralCode.user_id == current_user.id).first()
    
    if not ref_code:
        # Should confirm if we auto-gen here or only on onboarding
        return {"code": None, "usage_count": 0, "conversions": []}
    
    # Get conversions
    conversions = db.query(ReferralConversion).filter(ReferralConversion.referrer_code_id == ref_code.id).all()
    
    return {
        "code": ref_code.code,
        "usage_count": ref_code.usage_count, 
        "conversions": [
            {
                "purchased_plan": c.purchased_plan,
                "amount": c.amount_paid,
                "date": c.created_at
            }
            for c in conversions
        ]
    }

@router.get("/admin/analytics")
def get_growth_analytics(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Get aggregated growth analytics for Founder."""
    if current_user.role not in ["FOUNDER", "STAFF", "ANALYST"]:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    # 1. Onboarding Stats (Experience Level)
    exp_levels = db.query(UserOnboarding.experience_level, func.count(UserOnboarding.id)).group_by(UserOnboarding.experience_level).all()
    
    # 2. Preferred Markets (Need to flatten JSON arrays in python or use complex SQL)
    # Simplified: Just count raw records for now or do python processing
    all_onboarding = db.query(UserOnboarding).all()
    market_counts = {}
    for record in all_onboarding:
        if record.preferred_markets:
            for m in record.preferred_markets:
                market_counts[m] = market_counts.get(m, 0) + 1
                
    # 3. Visitor Stats (Countries)
    visitor_countries = db.query(VisitorLog.country, func.count(VisitorLog.id)).group_by(VisitorLog.country).all()
    
    # 4. Referral Performance
    top_referrers = db.query(ReferralCode).order_by(ReferralCode.usage_count.desc()).limit(5).all()
    
    return {
        "experience_distribution": {k: v for k, v in exp_levels if k},
        "market_preferences": market_counts,
        "visitor_countries": {k: v for k, v in visitor_countries if k},
        "top_referrers": [
            {"code": r.code, "usage": r.usage_count, "user": r.user.full_name}
            for r in top_referrers
        ]
    }
