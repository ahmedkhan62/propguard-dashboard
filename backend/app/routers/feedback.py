from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from app.db.session import get_db
from app.models.sql.user import User
from app.models.sql.feedback import Feedback
from app.models.sql.activity import EmployeeActivity
from app.routers import auth

router = APIRouter(
    prefix="/api/feedback",
    tags=["feedback"]
)

# --- Schemas ---
class FeedbackCreate(BaseModel):
    type: str # IDEA, COMPLAINT
    title: str
    description: str
    category: Optional[str] = None
    severity: Optional[str] = None

class FeedbackResponse(BaseModel):
    id: int
    user_id: int
    type: str
    title: str
    description: str
    category: Optional[str]
    severity: Optional[str]
    status: str
    admin_notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class FeedbackAdminUpdate(BaseModel):
    status: Optional[str] = None
    admin_notes: Optional[str] = None

# --- Endpoints ---

@router.post("/", response_model=FeedbackResponse)
def create_feedback(
    feedback: FeedbackCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    new_feedback = Feedback(
        user_id=current_user.id,
        type=feedback.type,
        title=feedback.title,
        description=feedback.description,
        category=feedback.category,
        severity=feedback.severity
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return new_feedback

@router.get("/", response_model=List[FeedbackResponse])
def get_user_feedback(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    return db.query(Feedback).filter(Feedback.user_id == current_user.id).all()

@router.get("/admin/all", response_model=List[FeedbackResponse])
def get_all_feedback(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    if current_user.role not in ["FOUNDER", "SUPPORT", "MODERATOR"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    return db.query(Feedback).all()

@router.patch("/admin/{feedback_id}", response_model=FeedbackResponse)
def update_feedback_status(
    feedback_id: int,
    update: FeedbackAdminUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    if current_user.role not in ["FOUNDER", "SUPPORT", "MODERATOR"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db_feedback = db.query(Feedback).filter(Feedback.id == feedback_id).first()
    if not db_feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    
    if update.status:
        db_feedback.status = update.status
    if update.admin_notes:
        db_feedback.admin_notes = update.admin_notes
        
    db.commit()
    db.refresh(db_feedback)
    
    # Log Activity
    activity = EmployeeActivity(
        employee_id=current_user.id,
        action="UPDATED_FEEDBACK_STATUS",
        module="FEEDBACK",
        description=f"Updated status of {db_feedback.type} #{feedback_id} to {update.status}"
    )
    db.add(activity)
    db.commit()
    
    return db_feedback
