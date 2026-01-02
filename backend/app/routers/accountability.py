"""
Insights & Goals Router
Provides risk awareness and performance insights - NO trade execution or blocking
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel

from app.database import get_db
from app.dependencies import get_current_user
from app.models.sql.user import User
from app.models.sql.accountability import TradingGoal, RiskAlert, BehaviorPattern, PerformanceInsight

router = APIRouter(prefix="/insights", tags=["insights"])


# ==================== SCHEMAS ====================

class TradingGoalCreate(BaseModel):
    goal_type: str
    threshold_value: float
    threshold_unit: Optional[str] = None


class TradingGoalResponse(BaseModel):
    id: int
    goal_type: str
    threshold_value: float
    threshold_unit: Optional[str]
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class RiskProximityResponse(BaseModel):
    """Current risk state - informational only"""
    goals_tracked: int
    proximity_alerts: List[dict]
    current_daily_pnl: Optional[float] = None
    overall_risk_level: str  # safe, moderate, high


class RiskAlertResponse(BaseModel):
    id: int
    alert_type: str
    severity: str
    message: str
    proximity_percentage: Optional[float]
    alert_timestamp: datetime
    is_acknowledged: bool

    class Config:
        from_attributes = True


# ==================== ENDPOINTS ====================

@router.post("/goals", response_model=TradingGoalResponse)
async def create_trading_goal(
    goal: TradingGoalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a trading goal for tracking
    IMPORTANT: Goals are for awareness only, not enforcement
    """
    
    valid_types = [
        "daily_loss_target",
        "max_position_size",
        "weekly_profit_target",
        "max_trades_per_day"
    ]
    
    if goal.goal_type not in valid_types:
        raise HTTPException(status_code=400, detail=f"Invalid goal type. Must be one of: {valid_types}")
    
    new_goal = TradingGoal(
        user_id=current_user.id,
        goal_type=goal.goal_type,
        threshold_value=goal.threshold_value,
        threshold_unit=goal.threshold_unit,
        is_active=True
    )
    
    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)
    
    return new_goal


@router.get("/goals", response_model=List[TradingGoalResponse])
async def get_trading_goals(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all active trading goals"""
    goals = db.query(TradingGoal).filter(
        TradingGoal.user_id == current_user.id,
        TradingGoal.is_active == True
    ).all()
    
    return goals


@router.get("/risk-proximity", response_model=RiskProximityResponse)
async def get_risk_proximity(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get current risk proximity state
    Returns informational data about how close user is to their goals
    This is awareness data, NOT enforcement
    """
    
    # Get active goals
    goals = db.query(TradingGoal).filter(
        TradingGoal.user_id == current_user.id,
        TradingGoal.is_active == True
    ).all()
    
    # TODO: Calculate actual proximity based on real trading data
    # For now, return structure showing what this endpoint provides
    
    proximity_alerts = []
    
    # Example structure (would be calculated from real data)
    for goal in goals:
        if goal.goal_type == "daily_loss_target":
            proximity_alerts.append({
                "goal_id": goal.id,
                "goal_type": goal.goal_type,
                "threshold": goal.threshold_value,
                "current": 0,  # Would be actual current value
                "proximity_pct": 0,  # Would be calculated
                "status": "safe"  # safe, warning, critical
            })
    
    # Determine overall risk level
    overall_risk_level = "safe"
    if any(alert["proximity_pct"] > 80 for alert in proximity_alerts):
        overall_risk_level = "high"
    elif any(alert["proximity_pct"] > 60 for alert in proximity_alerts):
        overall_risk_level = "moderate"
    
    return RiskProximityResponse(
        goals_tracked=len(goals),
        proximity_alerts=proximity_alerts,
        current_daily_pnl=None,  # Would be calculated from trades
        overall_risk_level=overall_risk_level
    )


@router.get("/alerts", response_model=List[RiskAlertResponse])
async def get_risk_alerts(
    unacknowledged_only: bool = False,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get risk alerts for the user
    These are informational notifications, not restrictions
    """
    query = db.query(RiskAlert).filter(RiskAlert.user_id == current_user.id)
    
    if unacknowledged_only:
        query = query.filter(RiskAlert.is_acknowledged == False)
    
    alerts = query.order_by(RiskAlert.alert_timestamp.desc()).limit(50).all()
    
    return alerts


@router.post("/alerts/{alert_id}/acknowledge")
async def acknowledge_alert(
    alert_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark an alert as acknowledged"""
    alert = db.query(RiskAlert).filter(
        RiskAlert.id == alert_id,
        RiskAlert.user_id == current_user.id
    ).first()
    
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    alert.is_acknowledged = True
    alert.acknowledged_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Alert acknowledged"}


@router.get("/patterns")
async def get_behavior_patterns(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get detected behavioral patterns
    Educational insights to help trader understand their habits
    """
    patterns = db.query(BehaviorPattern).filter(
        BehaviorPattern.user_id == current_user.id
    ).order_by(BehaviorPattern.detection_timestamp.desc()).limit(10).all()
    
    return patterns


@router.get("/performance-insights")
async def get_performance_insights(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get AI-generated performance insights
    Data-driven recommendations and observations
    """
    insights = db.query(PerformanceInsight).filter(
        PerformanceInsight.user_id == current_user.id
    ).order_by(PerformanceInsight.generated_at.desc()).limit(20).all()
    
    return insights


@router.delete("/goals/{goal_id}")
async def delete_trading_goal(
    goal_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Deactivate a trading goal"""
    goal = db.query(TradingGoal).filter(
        TradingGoal.id == goal_id,
        TradingGoal.user_id == current_user.id
    ).first()
    
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    goal.is_active = False
    db.commit()
    
    return {"message": "Goal deactivated"}
