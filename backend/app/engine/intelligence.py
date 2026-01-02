import logging
from datetime import datetime, timedelta
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from ..models.sql.trade import Trade

logger = logging.getLogger(__name__)

class IntelligenceEngine:
    """
    Analyzes trade history to detect behavioral patterns and session performance.
    """

    @staticmethod
    def _get_val(obj, key, default=None):
        """Helper to get value from either a dict or an object."""
        if isinstance(obj, dict):
            return obj.get(key, default)
        return getattr(obj, key, default)

    @staticmethod
    def _parse_time(t):
        """Helper to ensure time is a datetime object."""
        if isinstance(t, str):
            try:
                return datetime.fromisoformat(t.replace('Z', '+00:00'))
            except:
                return None
        return t

    @staticmethod
    def analyze_behavior(trades: List[Any]) -> Dict[str, Any]:
        if not trades:
            return {
                "flags": [],
                "session_performance": {},
                "score": 100
            }

        flags = []
        
        # 1. Overtrading Detection (Trades in last 60 mins)
        now = datetime.utcnow()
        recent_trades_count = 0
        for t in trades:
            open_time = IntelligenceEngine._parse_time(IntelligenceEngine._get_val(t, 'open_time'))
            if open_time:
                # Ensure offset-naive for comparison
                dt = open_time.replace(tzinfo=None)
                if (now - dt) < timedelta(hours=1):
                    recent_trades_count += 1

        if recent_trades_count >= 5:
            flags.append({
                "type": "overtrading",
                "severity": "warning" if recent_trades_count < 10 else "critical",
                "message": f"High frequency detected: {recent_trades_count} trades in the last hour."
            })

        # 2. Revenge Trading Detection
        # Pattern: Loss followed by a larger volume trade within 10 minutes
        def get_sort_key(x):
            ot = IntelligenceEngine._parse_time(IntelligenceEngine._get_val(x, 'open_time'))
            return ot.replace(tzinfo=None) if ot else datetime.min

        sorted_trades = sorted(trades, key=get_sort_key, reverse=True)
        
        for i in range(len(sorted_trades) - 1):
            current = sorted_trades[i]
            previous = sorted_trades[i+1]
            
            p_profit = IntelligenceEngine._get_val(previous, 'profit')
            p_close = IntelligenceEngine._parse_time(IntelligenceEngine._get_val(previous, 'close_time'))
            c_open = IntelligenceEngine._parse_time(IntelligenceEngine._get_val(current, 'open_time'))
            c_vol = IntelligenceEngine._get_val(current, 'volume', 0)
            p_vol = IntelligenceEngine._get_val(previous, 'volume', 0)

            if p_profit and p_profit < 0 and p_close and c_open:
                time_diff = c_open.replace(tzinfo=None) - p_close.replace(tzinfo=None)
                if time_diff < timedelta(minutes=10) and c_vol > p_vol:
                    flags.append({
                        "type": "revenge_trading",
                        "severity": "critical",
                        "message": "Revenge trading pattern: Aggressive re-entry with increased volume after a loss."
                    })
                    break

        # 3. Session Performance
        sessions = {"London": {"total": 0, "profit": 0}, "NY": {"total": 0, "profit": 0}, "Asia": {"total": 0, "profit": 0}}
        for t in trades:
            session = IntelligenceEngine._get_val(t, 'session')
            profit = IntelligenceEngine._get_val(t, 'profit', 0)
            if not session: continue
            
            if session in sessions:
                sessions[session]["total"] += 1
                if profit:
                    sessions[session]["profit"] += profit

        # Calculate Win Rates by Session
        session_performance = {}
        for name, data in sessions.items():
            if data["total"] > 0:
                session_performance[name] = {
                    "count": data["total"],
                    "profit": round(data["profit"], 2)
                }

        return {
            "flags": flags,
            "session_performance": session_performance,
            "score": max(0, 100 - (len(flags) * 20))
        }
