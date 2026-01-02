from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel, EmailStr

from app.db.session import get_db
from app.models.sql.user import User
from app.models.sql.activity import EmployeeActivity
from app.routers.auth import get_current_user
from app.core import security

router = APIRouter(prefix="/api/admin/team", tags=["team"])

class EmployeeCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str = "STAFF"
    permissions: dict = {}

class EmployeeUpdate(BaseModel):
    role: str = None
    is_suspended: bool = None
    permissions: dict = None

@router.get("/employees")
def list_employees(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    staff_roles = ["STAFF", "SUPPORT", "ANALYST", "MODERATOR"]
    return db.query(User).filter(User.role.in_(staff_roles)).all()

@router.post("/employees")
def create_employee(data: EmployeeCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="User already exists")
    
    new_staff = User(
        email=data.email,
        full_name=data.full_name,
        hashed_password=security.get_password_hash(data.password),
        role=data.role,
        permissions=data.permissions
    )
    db.add(new_staff)
    db.commit()
    db.refresh(new_staff)
    return new_staff

@router.post("/employees/{employee_id}/force-logout")
def force_logout(employee_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    staff = db.query(User).filter(User.id == employee_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    staff.requires_reauth = True
    db.commit()
    return {"status": "Force logout initiated"}

@router.post("/employees/{employee_id}/reset-password")
def reset_password(employee_id: int, data: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    staff = db.query(User).filter(User.id == employee_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    new_password = data.get("password")
    if not new_password:
        raise HTTPException(status_code=400, detail="Password required")
        
    staff.hashed_password = security.get_password_hash(new_password)
    staff.requires_reauth = True # Force logout after password change
    db.commit()
    return {"status": "Password reset successfully"}

@router.get("/insights/{employee_id}")
def get_employee_insights(employee_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Calculate performance metrics
    activities = db.query(EmployeeActivity).filter(EmployeeActivity.employee_id == employee_id).all()
    
    total_actions = len(activities)
    
    module_counts = {}
    for act in activities:
        module_counts[act.module] = module_counts.get(act.module, 0) + 1
        
    most_active_module = max(module_counts, key=module_counts.get) if module_counts else "None"
    
    # Calculate time spent for current session
    time_spent_str = "0m"
    staff = db.query(User).filter(User.id == employee_id).first()
    if staff and staff.session_start and staff.last_active:
        # If last active was recent (within 30 mins), consider them online/active session
        if (func.now() - staff.last_active).total_seconds() < 1800:
             duration = staff.last_active - staff.session_start
             hours = duration.seconds // 3600
             minutes = (duration.seconds % 3600) // 60
             time_spent_str = f"{hours}h {minutes}m"
    
    return {
        "total_actions": total_actions,
        "most_active_module": most_active_module,
        "recent_activity_count": len([a for a in activities if (func.now() - a.timestamp).total_seconds() < 86400]), # Last 24h
        "time_spent": time_spent_str
    }

@router.patch("/employees/{employee_id}")
def update_employee(employee_id: int, data: EmployeeUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    staff = db.query(User).filter(User.id == employee_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    if data.role:
        staff.role = data.role
    if data.is_suspended is not None:
        staff.is_suspended = data.is_suspended
    if data.permissions is not None:
        staff.permissions = data.permissions
        
    db.commit()
    return staff

@router.delete("/employees/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    staff = db.query(User).filter(User.id == employee_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Employee not found")
        
    db.delete(staff)
    db.commit()
    return {"status": "Staff account deleted successfully"}

@router.get("/activity")
def get_team_activity(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return db.query(EmployeeActivity).order_by(EmployeeActivity.timestamp.desc()).limit(50).all()
