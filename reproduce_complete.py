import sys
import os
import requests

# Add backend to path for DB access imports
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.db.session import SessionLocal
from app.models.sql.user import User
from app.core.security import get_password_hash

BASE_URL = "http://localhost:8000/api"

def ensure_test_user():
    db = SessionLocal()
    email = "test@example.com"
    password = "password123"
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        print(f"Creating test user {email}...")
        user = User(
            email=email,
            full_name="Test User",
            hashed_password=get_password_hash(password)
        )
        db.add(user)
        db.commit()
    db.close()
    return email, password

def run_test():
    email, password = ensure_test_user()
    
    # 1. Login
    print("Logging in...")
    resp = requests.post(f"{BASE_URL}/auth/token", data={
        "username": email,
        "password": password
    })
    
    if resp.status_code != 200:
        print("Login Failed:", resp.text)
        return

    token = resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 2. Get Dashboard
    print("Fetching Dashboard Overview...")
    resp = requests.get(f"{BASE_URL}/dashboard/overview", headers=headers)
    
    print(f"Status Code: {resp.status_code}")
    if resp.status_code == 500:
        print("Error Detail:", resp.text)
    else:
        print("Success!", resp.json())

if __name__ == "__main__":
    try:
        run_test()
    except Exception as e:
        print(f"Script Error: {e}")
