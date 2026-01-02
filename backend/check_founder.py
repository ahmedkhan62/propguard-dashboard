from app.db.session import SessionLocal, SQLALCHEMY_DATABASE_URL
from app.models.sql.user import User
from app.core import security
import os

print(f"Checking Database: {SQLALCHEMY_DATABASE_URL}")
print(f"File exists: {os.path.exists(SQLALCHEMY_DATABASE_URL.replace('sqlite:///', ''))}")

db = SessionLocal()
user = db.query(User).filter(User.email == "founder@risklock.com").first()

if user:
    print(f"User found: {user.email}")
    print(f"Role: {user.role}")
    print(f"Hashed Password: {user.hashed_password}")
    
    # Test verification
    is_correct = security.verify_password("founder2025", user.hashed_password)
    print(f"Password 'founder2025' verification: {is_correct}")
else:
    print("User NOT found")

db.close()
