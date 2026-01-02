from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine, Base

app = FastAPI(
    title="RiskLock Engine",
    description="Real-time Risk Management Engine for Prop Traders",
    version="0.1.1" # Bumped to trigger reload
)

# Ensure tables are created on startup (Permanent Solution for local dev)
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

# Configure CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://localhost:8081", "http://localhost:8080", "http://localhost:3000",
        "http://127.0.0.1:5173", "http://127.0.0.1:8081", "http://127.0.0.1:8080", "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "active", "system": "RiskLock Engine", "version": "0.1.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

from app.routers import dashboard, auth, brokers, audit, reports, feedback, support, team, growth, accountability as insights
app.include_router(dashboard.router)
app.include_router(auth.router)
app.include_router(brokers.router)
app.include_router(audit.router)
app.include_router(reports.router)
app.include_router(feedback.router)
app.include_router(support.router)
app.include_router(team.router)
app.include_router(growth.router)
app.include_router(insights.router)
