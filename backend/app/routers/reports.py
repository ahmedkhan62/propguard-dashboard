from fastapi import APIRouter, Depends, HTTPException, Query, Response
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
import io

from ..db.session import get_db
from ..routers import auth
from ..routers.dashboard import get_broker_service
from ..models.sql.user import User
from ..models.sql.broker import BrokerAccount
from ..engine.risk import risk_engine
from ..engine.intelligence import IntelligenceEngine
from ..services.reporting import reporting_service

router = APIRouter(prefix="/reports", tags=["reports"])

def founder_only(user: User = Depends(auth.get_current_user)):
    if user.role != "FOUNDER":
        raise HTTPException(status_code=403, detail="Founder privilege required")
    return user

@router.get("/generate")
async def generate_report(
    account_id: int,
    format: str = Query("pdf", pattern="^(pdf|csv)$"),
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_user)
):
    """
    Generates a PDF or CSV report for a specific broker account.
    """
    account_model = db.query(BrokerAccount).filter(
        BrokerAccount.id == account_id,
        BrokerAccount.user_id == current_user.id
    ).first()
    
    if not account_model:
        raise HTTPException(status_code=404, detail="Account not found")

    try:
        broker_service = await get_broker_service(db, current_user, account_model=account_model)
        
        # Parallel fetch for report data
        import asyncio
        info_task = asyncio.create_task(broker_service.get_account_info())
        trades_task = asyncio.create_task(broker_service.get_trades())
        
        account_data, trades = await asyncio.gather(info_task, trades_task)
        
        daily_stats = risk_engine.get_daily_stats(trades)
        risk_report = risk_engine.check_risk(
            account_data, daily_stats, trades, db, account_model=account_model
        )
        insights = IntelligenceEngine.analyze_behavior(trades)

        # Tier Gating for Reports
        if current_user.subscription_tier == "free":
            insights["score"] = "Upgrade to Pro"
            insights["session_performance"] = {}

        if format == "pdf":
            pdf_buffer = reporting_service.generate_pdf_report(
                current_user.email,
                account_model.account_id,
                account_data,
                trades,
                risk_report,
                insights
            )
            return StreamingResponse(
                pdf_buffer,
                media_type="application/pdf",
                headers={"Content-Disposition": f"attachment; filename=RiskLock_Report_{account_model.account_id}.pdf"}
            )
        else:
            csv_output = reporting_service.generate_csv_report(trades)
            return StreamingResponse(
                io.BytesIO(csv_output.getvalue().encode()),
                media_type="text/csv",
                headers={"Content-Disposition": f"attachment; filename=RiskLock_Trades_{account_model.account_id}.csv"}
            )

    except Exception as e:
        print(f"Report Generation Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
