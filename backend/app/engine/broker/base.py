from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from datetime import datetime

class BrokerConnector(ABC):
    """
    Abstract Base Class for all Broker Connectors (MetaApi, cTrader, etc.)
    Standardizes how the application interacts with different brokerage APIs.
    """

    @abstractmethod
    async def connect(self) -> bool:
        """Establishes connection to the broker API."""
        pass

    @abstractmethod
    async def get_account_info(self) -> Dict[str, Any]:
        """
        Returns standardized account info:
        {
            "login": int,
            "name": str,
            "server": str,
            "currency": str,
            "leverage": int,
            "balance": float,
            "equity": float,
            "margin": float,
            "margin_free": float,
            "margin_level": float,
            "profit": float,
            "platform": str  # 'mt4', 'mt5', 'ctrader'
        }
        """
        pass

    @abstractmethod
    async def get_trades(self) -> List[Dict[str, Any]]:
        """
        Returns list of standardized trades.
        """
        pass

    @property
    def last_sync(self) -> Optional[datetime]:
        """Timestamp of the last successful data synchronization."""
        return getattr(self, '_last_sync', None)

    @property
    def confidence_status(self) -> str:
        """
        Returns the data confidence status: 'LIVE', 'DEGRADED', 'STALE', 'PAUSED'
        """
        return getattr(self, '_confidence_status', 'PAUSED')

    # --- LEGAL BOUNDARY: EXECUTION BLOCKED ---
    def place_order(self, *args, **kwargs):
        """EXPLICITLY BLOCKED: RiskLock is a Read-Only system."""
        raise NotImplementedError("RiskLock is read-only by design. Execution is not supported.")

    def modify_order(self, *args, **kwargs):
        """EXPLICITLY BLOCKED: RiskLock is a Read-Only system."""
        raise NotImplementedError("RiskLock is read-only by design. Execution is not supported.")

    def close_position(self, *args, **kwargs):
        """EXPLICITLY BLOCKED: RiskLock is a Read-Only system."""
        raise NotImplementedError("RiskLock is read-only by design. Execution is not supported.")
