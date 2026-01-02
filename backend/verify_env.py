import os
import sys
from dotenv import load_dotenv

def verify_env():
    print("🔍 Validating Environment Configuration...")
    load_dotenv()
    
    required_vars = ["SECRET_KEY", "META_API_TOKEN"]
    missing = []
    
    for var in required_vars:
        val = os.getenv(var)
        if not val or val == "your-secret-key-here" or "generate-a-secure" in val:
            missing.append(var)
            
    if missing:
        print(f"❌ ERROR: Missing or insecure configuration for: {', '.join(missing)}")
        print("Please copy .env.example to .env and fill in the values.")
        return False
    
    print("✅ Configuration looks good (Secrets present).")
    return True

if __name__ == "__main__":
    if verify_env():
        sys.exit(0)
    else:
        sys.exit(1)
