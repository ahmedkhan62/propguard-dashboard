from app.db.session import engine, Base, SessionLocal
from app.models.sql import user, trade, broker, audit
from app.models.sql.user import User
from app.core import security

# Create tables
def init_db():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")
    
    # Seed Data
    db = SessionLocal()
    if not db.query(User).filter(User.email == "founder@risklock.com").first():
        print("Seeding founder user...")
        founder_user = User(
            email="founder@risklock.com",
            full_name="RiskLock Founder",
            hashed_password=security.get_password_hash("founder2025"),
            role="FOUNDER",
            subscription_tier="ultra"
        )
        db.add(founder_user)
        db.commit()
        print("Founder user created.")

    if not db.query(User).filter(User.email == "trader@example.com").first():
        print("Seeding default user...")
        default_user = User(
            email="trader@example.com",
            full_name="Prop Trader",
            hashed_password=security.get_password_hash("password123"),
            role="USER"
        )
        db.add(default_user)
        db.commit()
        print("Default user created.")
    db.close()

if __name__ == "__main__":
    init_db()
