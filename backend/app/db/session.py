import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite for local development
# Use absolute path to ensure consistency across different execution contexts
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # This is /backend/app/db/
DB_DIR = os.path.dirname(os.path.dirname(BASE_DIR)) # This is /backend/
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(DB_DIR, 'risklock_v2.db')}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # Needed only for SQLite
)
print(f"DEBUG: Database Engine initialized with URL: {SQLALCHEMY_DATABASE_URL}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
