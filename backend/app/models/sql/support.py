from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.session import Base

class SupportChat(Base):
    __tablename__ = "support_chats"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Null for guests
    guest_name = Column(String, nullable=True)
    guest_email = Column(String, nullable=True)
    
    status = Column(String, default="BOT") # BOT, ACTIVE, CLOSED, OFFLINE_TICKET
    priority = Column(String, default="STANDARD") # STANDARD, PRIORITY (for subscribers)
    
    assigned_staff_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    messages = relationship("SupportMessage", back_populates="chat")
    user = relationship("User", foreign_keys=[user_id])
    staff = relationship("User", foreign_keys=[assigned_staff_id])

class SupportMessage(Base):
    __tablename__ = "support_messages"

    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("support_chats.id"))
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Null for guests or bot
    sender_type = Column(String) # USER, STAFF, BOT, GUEST
    
    content = Column(Text)
    is_read = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    chat = relationship("SupportChat", back_populates="messages")
