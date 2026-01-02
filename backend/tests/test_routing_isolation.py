import requests
import sys

# Configuration
BASE_URL = "http://localhost:8000"
# Assumes default users created or available. 
# You might need to adjust these credentials based on your DB state or use a setup fixture.
FOUNDER_EMAIL = "founder@risklock.com"
STAFF_EMAIL = "support@risklock.com"
USER_EMAIL = "trader@example.com"
PASSWORD = "password123" # Assuming standard password for dev

def get_token(email, password):
    response = requests.post(f"{BASE_URL}/api/auth/token", data={
        "username": email,
        "password": password
    })
    if response.status_code != 200:
        print(f"[-] Failed to login as {email}: {response.text}")
        return None
    return response.json()["access_token"]

def verify_access(role, token, url, expected_status):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}{url}", headers=headers)
    
    if response.status_code == expected_status:
        print(f"[+] {role} accessing {url}: SUCCESS (Got {response.status_code})")
        return True
    else:
        print(f"[-] {role} accessing {url}: FAILED (Expected {expected_status}, Got {response.status_code})")
        return False

def main():
    print("=== Verification: Routing Isolation ===\n")
    
    # Get Tokens
    founder_token = get_token(FOUNDER_EMAIL, PASSWORD)
    staff_token = get_token(STAFF_EMAIL, PASSWORD)
    user_token = get_token(USER_EMAIL, PASSWORD)
    
    if not (founder_token and staff_token and user_token):
        print("[-] Could not get tokens for all roles. Aborting.")
        # Create users if they don't exist? (Skipped for brevity, confusing dev environment)
        return

    # 1. Verify User cannot access Admin API
    print("\n[Test] User Isolation")
    verify_access("USER", user_token, "/api/admin/users", 403)
    
    # 2. Verify Staff cannot access User API (Dashboard data) - conceptually
    # Assuming /api/dashboard is for traders
    print("\n[Test] Staff Isolation")
    # verify_access("STAFF", staff_token, "/api/dashboard/stats", 403) 
    # Current codebase uses /api/admin/* for all admin stuff. 
    # We should verify Staff can access filtered Admin stuff but not potentially trader stuff if any.
    
    # 3. Verify Staff cannot access Restricted Admin API (e.g., Billing)
    print("\n[Test] Staff Restricted Access")
    verify_access("STAFF", staff_token, "/api/admin/billing/invoices", 403)
    
    # 4. Verify Founder has access to everything
    print("\n[Test] Founder Supremacy")
    verify_access("FOUNDER", founder_token, "/api/admin/users", 200)
    verify_access("FOUNDER", founder_token, "/api/admin/billing/invoices", 200)

if __name__ == "__main__":
    main()
