from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from jose import JWTError, jwt
from sqlalchemy.sql import func

from app.db.session import get_db
from app.models.sql.user import User
from app.core import security

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"]
)

# --- Schemas ---
class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    is_active: bool
    subscription_tier: str = "free"
    max_accounts_limit: int = 1
    
    class Config:
        from_attributes = True

# --- Endpoints ---

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check existing
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new
    hashed_pw = security.get_password_hash(user.password)
    new_user = User(
        email=user.email, 
        full_name=user.full_name,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print(f"DEBUG: Login Attempt for username: {form_data.username}")
    from app.db.session import SQLALCHEMY_DATABASE_URL
    print(f"DEBUG: Using Database URL: {SQLALCHEMY_DATABASE_URL}")
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user:
        print(f"DEBUG: User {form_data.username} NOT FOUND in database")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not security.verify_password(form_data.password, user.hashed_password):
        print(f"DEBUG: Password verification FAILED for user {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    print(f"DEBUG: Login SUCCESS for user {form_data.username}, role: {user.role}")
    
    if user.is_suspended:
        raise HTTPException(status_code=403, detail="Your account has been suspended. Please contact the Founder.")

    now = func.now()
    user.last_login = now
    user.last_active = now # Initialize last_active
    db.commit()
    
    # Create JWT
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={
            "sub": user.email, 
            "user_id": user.id,
            "full_name": user.full_name,
            "subscription_tier": user.subscription_tier,
            "max_accounts_limit": user.max_accounts_limit,
            "role": user.role,
            "permissions": user.permissions,
            "is_onboarded": user.is_onboarded
        },
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# --- Dependency ---
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
             raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    
    if user.is_suspended:
        raise HTTPException(status_code=403, detail="Account suspended")
        
    if getattr(user, 'requires_reauth', False):
        user.requires_reauth = False
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session terminated by Administrator",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Update last_login, last_active, and session_start
    try:
        user.last_login = func.now()
        user.last_active = func.now()
        user.session_start = func.now()
        db.commit()
    except Exception as e:
        print(f"DEBUG: Failed to update user activity timestamps: {e}")
        db.rollback()
        
    return user

def check_permission(permission: str):
    def dependency(user: User = Depends(get_current_user)):
        if user.role == "FOUNDER":
            return user
        if not user.permissions or not user.permissions.get(permission):
            raise HTTPException(status_code=403, detail=f"Permission denied: {permission}")
        return user
    return dependency
