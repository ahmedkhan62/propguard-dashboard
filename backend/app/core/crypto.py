from cryptography.fernet import Fernet
from app.core import config

# We need a stable key for encryption. 
# In production, this MUST be loaded from env.
# For now, we will generate one or use a fixed one if not provided, 
# but warning: fixed key in code is insecure.
# We'll use the SECRET_KEY from settings + padding as a quick hack for MVP if needed,
# or better, check if settings has an ENCRYPTION_KEY.

# Let's add ENCRYPTION_KEY to settings first. 
# If not present, we can derive it or fail.
# For this task, I'll assume we can add it to config.

def get_cipher_suite():
    # Fernet requires a 32-url-safe base64-encoded bytes key.
    # We will generate one for now if missing, but it won't persist across restarts if generated here.
    # So we must use a deterministic key based on SECRET_KEY for this MVP 
    # if we don't want to force user to edit .env yet.
    
    # Simple derivation for MVP:
    import base64
    import hashlib
    
    key = hashlib.sha256(config.settings.SECRET_KEY.encode()).digest()
    key_b64 = base64.urlsafe_b64encode(key)
    return Fernet(key_b64)

def encrypt_token(token: str) -> str:
    cipher = get_cipher_suite()
    return cipher.encrypt(token.encode()).decode()

def decrypt_token(token_encrypted: str) -> str:
    cipher = get_cipher_suite()
    return cipher.decrypt(token_encrypted.encode()).decode()
