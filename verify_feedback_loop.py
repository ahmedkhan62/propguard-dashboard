import requests
import json
import sys

BASE_URL = "http://localhost:8000/api"

def get_token(email, password):
    response = requests.post(f"{BASE_URL}/auth/token", data={"username": email, "password": password})
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print(f"Failed to get token for {email}: {response.text}")
        return None

def verify_feedback_loop():
    # 1. Login as user and admin
    # Assuming standard test credentials from previous context or common patterns
    user_token = get_token("trader@example.com", "password123")
    admin_token = get_token("founder@risklock.com", "founder2025")

    if not user_token or not admin_token:
        print("Skipping automated verification due to missing test accounts. Please verify manually.")
        return

    user_headers = {"Authorization": f"Bearer {user_token}"}
    admin_headers = {"Authorization": f"Bearer {admin_token}"}

    # 2. Create an idea
    idea_data = {
        "type": "IDEA",
        "title": "Automated Verification Test",
        "description": "Testing the feedback loop implementation.",
        "category": "Other"
    }
    create_res = requests.post(f"{BASE_URL}/feedback/", json=idea_data, headers=user_headers)
    if create_res.status_code != 200:
        print(f"Failed to create idea: {create_res.text}")
        return
    
    idea_id = create_res.json()["id"]
    print(f"Created idea with ID: {idea_id}")

    # 3. Update as admin with notes
    update_data = {
        "status": "PLANNED",
        "admin_notes": "This is an automated response from the Founder."
    }
    update_res = requests.patch(f"{BASE_URL}/feedback/admin/{idea_id}", json=update_data, headers=admin_headers)
    if update_res.status_code != 200:
        print(f"Failed to update idea as admin: {update_res.text}")
        return
    print("Updated idea as admin with status PLANNED and notes.")

    # 4. Verify user sees the update
    history_res = requests.get(f"{BASE_URL}/feedback/", headers=user_headers)
    if history_res.status_code != 200:
        print(f"Failed to fetch user history: {history_res.text}")
        return
    
    user_history = history_res.json()
    updated_idea = next((f for f in user_history if f["id"] == idea_id), None)
    
    if updated_idea and updated_idea["status"] == "PLANNED" and updated_idea["admin_notes"] == "This is an automated response from the Founder.":
        print("SUCCESS: Feedback loop verified!")
    else:
        print(f"FAILED: Updated idea not found or data mismatch: {updated_idea}")

if __name__ == "__main__":
    verify_feedback_loop()
