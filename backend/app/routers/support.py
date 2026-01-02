from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
import json
import asyncio

from app.db.session import get_db
from app.models.sql.support import SupportChat, SupportMessage
from app.models.sql.activity import EmployeeActivity
from app.models.sql.user import User
from app.routers.auth import get_current_user

router = APIRouter(prefix="/api/support", tags=["support"])

# Connection Manager for WebSockets
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, chat_id: int, websocket: WebSocket):
        await websocket.accept()
        if chat_id not in self.active_connections:
            self.active_connections[chat_id] = []
        self.active_connections[chat_id].append(websocket)

    def disconnect(self, chat_id: int, websocket: WebSocket):
        if chat_id in self.active_connections:
            self.active_connections[chat_id].remove(websocket)

    async def broadcast(self, chat_id: int, message: dict):
        if chat_id in self.active_connections:
            for connection in self.active_connections[chat_id]:
                await connection.send_text(json.dumps(message))

manager = ConnectionManager()

# Bot Logic (Simple Keyword Engine)
def get_bot_response(text: str) -> str:
    text = text.lower()
    if "pricing" in text or "cost" in text:
        return "RiskLock offers three tiers: Standard, Elite, and Ultra. You can find detailed pricing on our /pricing page!"
    if "setup" in text or "connect" in text:
        return "To connect your account, go to Dashboard > Settings and enter your MetaApi credentials. I can guide you through it!"
    if "human" in text or "agent" in text or "help" in text:
        return "Understood. I'm notifying a support specialist to join this chat. One moment..."
    return "I'm the RiskLock AI. I can help with pricing, setup, or technical FAQs. Would you like to speak with a human agent?"

@router.websocket("/ws/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: int, db: Session = Depends(get_db)):
    await manager.connect(chat_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Save User Message
            new_msg = SupportMessage(
                chat_id=chat_id,
                content=message_data["content"],
                sender_type=message_data.get("sender_type", "USER"),
                sender_id=message_data.get("sender_id")
            )
            db.add(new_msg)
            db.commit()

            # Log activity if STAFF
            if message_data.get("sender_type") == "STAFF":
                activity = EmployeeActivity(
                    employee_id=message_data.get("sender_id"),
                    action="REPLIED_TO_CHAT",
                    module="SUPPORT",
                    description=f"Replied to chat #{chat_id}"
                )
                db.add(activity)
                db.commit()

            # Broadcast to all in the same chat (Staff + User)
            await manager.broadcast(chat_id, {
                "content": message_data["content"],
                "sender_type": message_data["sender_type"],
                "created_at": str(new_msg.created_at)
            })

            # Bot Processing if chat is in BOT state
            chat = db.query(SupportChat).filter(SupportChat.id == chat_id).first()
            if chat and chat.status == "BOT":
                bot_reply = get_bot_response(message_data["content"])
                
                # Check for escalation
                if "notifying a support specialist" in bot_reply:
                    chat.status = "ACTIVE"
                    db.commit()
                
                # Save & Broadcast Bot Message
                bot_msg = SupportMessage(
                    chat_id=chat_id,
                    content=bot_reply,
                    sender_type="BOT"
                )
                db.add(bot_msg)
                db.commit()
                
                # Simulate small delay for natural feeling
                await asyncio.sleep(1)
                
                await manager.broadcast(chat_id, {
                    "content": bot_reply,
                    "sender_type": "BOT",
                    "created_at": str(bot_msg.created_at)
                })

    except WebSocketDisconnect:
        manager.disconnect(chat_id, websocket)

@router.get("/chats")
def get_chats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role not in ["FOUNDER", "SUPPORT"]:
        raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(SupportChat).all()

@router.post("/chats/init")
def init_chat(data: dict, db: Session = Depends(get_db)):
    # Can handle both guests and users
    new_chat = SupportChat(
        user_id=data.get("user_id"),
        guest_name=data.get("guest_name"),
        guest_email=data.get("guest_email"),
        priority="PRIORITY" if data.get("is_subscriber") else "STANDARD"
    )
    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    # Initial Bot Greeting
    greeting = SupportMessage(
        chat_id=new_chat.id,
        content="Welcome to RiskLock Priority Support. Our AI is analyzing your account status. A human agent will be notified if your query requires deeper technical analysis.",
        sender_type="BOT"
    )
    db.add(greeting)
    
    # Check if staff online (Simplified for now)
    # In a real app, we'd check current connections in manager
    if not any(conn for conn in manager.active_connections.values() if any(c.get("role") == "STAFF" for c in conn)):
        fallback = SupportMessage(
            chat_id=new_chat.id,
            content="NOTE: Our technical team is currently handling high volume. A Human Agent will join this thread as soon as possible. Please describe your issue in detail.",
            sender_type="BOT"
        )
        db.add(fallback)

    db.commit()

@router.get("/history/{chat_id}")
def get_history(chat_id: int, db: Session = Depends(get_db)):
    return db.query(SupportMessage).filter(SupportMessage.chat_id == chat_id).all()
