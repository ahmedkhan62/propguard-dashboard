import os
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "RiskLock API"
    API_V1_STR: str = "/api"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here" # Move to env in production
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # MetaApi Configuration
    META_API_TOKEN: Optional[str] = os.getenv("META_API_TOKEN")
    META_ACCOUNT_ID: Optional[str] = os.getenv("META_ACCOUNT_ID")

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
