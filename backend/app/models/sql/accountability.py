"""
Trading Insights & Goals System
Provides data-driven awareness and pattern detection - NO execution control
"""
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.sql.base import Base


class TradingGoal(Base):
    """User-defined trading goals and thresholds for awareness"""
    __tablename__ = "trading_goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Goal configuration
    goal_type = Column(String(50), nullable=False)  # daily_loss_target, max_position_size, weekly_profit_target
    threshold_value = Column(Float, nullable=False)
    threshold_unit = Column(String(20), nullable=True)  # USD, pct, count
    
    # Status
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="trading_goals")


class RiskAlert(Base):
    """Risk proximity alerts - informational only, NOT restrictive"""
    __tablename__ = "risk_alerts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    goal_id = Column(Integer, ForeignKey("trading_goals.id"), nullable=True)
    
    # Alert details
    alert_timestamp = Column(DateTime, default=datetime.utcnow)
    alert_type = Column(String(50), nullable=False)  # proximity_warning, threshold_reached, pattern_detected
    severity = Column(String(20), nullable=False)  # info, warning, critical
    
    # Context
    current_value = Column(Float, nullable=True)
    threshold_value = Column(Float, nullable=True)
    proximity_percentage = Column(Float, nullable=True)  # How close to threshold (0-100%)
    
    # Message
    message = Column(Text, nullable=False)
    is_acknowledged = Column(Boolean, default=False)
    acknowledged_at = Column(DateTime, nullable=True)
    
    # Relationships
    user = relationship("User")
    goal = relationship("TradingGoal")


class BehaviorPattern(Base):
    """Detected trading patterns - for awareness and learning"""
    __tablename__ = "behavior_patterns"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Pattern details
    pattern_type = Column(String(50), nullable=False)  # overtrading, loss_streak, position_sizing_escalation
    detection_timestamp = Column(DateTime, default=datetime.utcnow)
    confidence_score = Column(Float, nullable=False)  # 0-100
    
    # Context
    contributing_factors = Column(Text, nullable=True)  # JSON string
    recommendation = Column(Text, nullable=True)
    
    # User feedback
    is_acknowledged = Column(Boolean, default=False)
    user_feedback = Column(Text, nullable=True)
    
    # Relationships
    user = relationship("User")


class PerformanceInsight(Base):
    """AI-generated insights about trading performance"""
    __tablename__ = "performance_insights"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Insight details
    insight_type = Column(String(50), nullable=False)  # correlation, trend, anomaly, recommendation
    generated_at = Column(DateTime, default=datetime.utcnow)
    
    # Content
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    data_points = Column(Text, nullable=True)  # JSON string with supporting data
    
    # Metadata
    importance = Column(Integer, nullable=False)  # 1-5 rating
    is_read = Column(Boolean, default=False)
    
    # Relationships
    user = relationship("User")
