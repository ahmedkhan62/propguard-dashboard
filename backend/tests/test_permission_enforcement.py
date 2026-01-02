import requests
import sys

# Configuration
BASE_URL = "http://localhost:8000"
STAFF_EMAIL = "support@risklock.com"
PASSWORD = "password123"

def main():
    print("=== Verification: Granular Permission Enforcement ===\n")
    
    # Login as Staff
    response = requests.post(f"{BASE_URL}/api/auth/token", data={
        "username": STAFF_EMAIL,
        "password": PASSWORD
    })
    if response.status_code != 200:
        print(f"[-] Failed to login as {STAFF_EMAIL}")
        return
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 1. Test Viewing Users (Assuming explicit permission 'view_users' is required)
    # If the staff member created in dev seed doesn't have it, this should fail.
    # If we just created them with no permissions, it should fail.
    print(f"\n[Test] Accessing /api/admin/users without explicit permission")
    response = requests.get(f"{BASE_URL}/api/admin/users", headers=headers)
    
    if response.status_code == 403:
        print("[+] Permission check passed: Access Denied (403)")
    elif response.status_code == 200:
        print("[-] Permission check failed: Access Granted (200) - Staff might have permission enabled?")
    else:
        print(f"[-] Unexpected status: {response.status_code}")

if __name__ == "__main__":
    main()
