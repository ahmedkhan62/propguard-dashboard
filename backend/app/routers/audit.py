from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.routers import auth
from app.models.sql.user import User
from app.models.sql.audit import AuditLog
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(
    prefix="/api/audit",
    tags=["audit"]
)

class AuditLogResponse(BaseModel):
    id: int
    action: str
    category: str
    details: dict
    timestamp: datetime
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[AuditLogResponse])
def get_audit_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    """Retrieve immutable logs for the current user."""
    logs = db.query(AuditLog).filter(AuditLog.user_id == current_user.id).order_by(AuditLog.timestamp.desc()).limit(100).all()
    return logs
