import sys
import os
import requests

# We assume this script is run from 'backend/' directory
# So 'app' is importable directly.

from app.db.session import SessionLocal
from app.models.sql.user import User
from app.core.security import get_password_hash

BASE_URL = "http://localhost:8000/api"

def ensure_test_user():
    db = SessionLocal()
    email = "test@example.com"
    password = "password123"
    
    # Check if user exists
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
    else:
        print(f"User {email} exists.")
        # Ensure password matches (hashed) - we can't easily check match without known plain text,
        # but if we created it before it should be fine. 
        # For reproduction, we can just create a NEW user if login fails.
    
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
        # Try to update password if login failed?
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
        print("Success!")
        # Print keys to verify structure
        print(resp.json().keys())

if __name__ == "__main__":
    try:
        run_test()
    except Exception as e:
        print(f"Script Error: {e}")
