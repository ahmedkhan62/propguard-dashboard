from app.core import security
from app.db.session import SessionLocal
from app.models.sql.user import User

def test_login():
    db = SessionLocal()
    email = "trader@example.com"
    password = "password123"
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        print(f"FAILED: User {email} not found in DB.")
        return

    print(f"User found: {user.email}")
    print(f"Password Hash in DB: {user.hashed_password}")
    
    match = security.verify_password(password, user.hashed_password)
    if match:
        print("SUCCESS: Password verified.")
    else:
        print("FAILED: Password mismatch.")
    
    db.close()

if __name__ == "__main__":
    test_login()
