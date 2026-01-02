import os
import asyncio
from datetime import datetime
from typing import Dict, Any, List, Optional
from metaapi_cloud_sdk import MetaApi
from .base import BrokerConnector

class MetaApiConnector(BrokerConnector):
    def __init__(self, token: str, account_id: str):
        self.token = token
        self.account_id = account_id
        self.api = MetaApi(token=token)
        self.account = None
        self.connection = None
        self._last_sync = None
        self._confidence_status = "PAUSED"

    async def connect(self) -> bool:
        """
        Connects to the MetaApi cloud account with timeouts.
        """
        if self.connection and self.connection.is_connected():
            return True

        try:
            self.account = await asyncio.wait_for(
                self.api.metatrader_account_api.get_account(self.account_id),
                timeout=10.0
            )
            
            # 1. Update health from cloud state
            if self.account.connection_status != 'CONNECTED':
                self._confidence_status = "DEGRADED"
                print(f"MetaApi Account {self.account_id} is {self.account.connection_status}")
            
            # 2. Wait for connection (redeploy if necessary)
            if self.account.state != 'DEPLOYED':
                await asyncio.wait_for(self.account.deploy(), timeout=30.0)
            
            await asyncio.wait_for(self.account.wait_connected(), timeout=20.0)
            self.connection = self.account.get_rpc_connection()
            await asyncio.wait_for(self.connection.connect(), timeout=10.0)
            await asyncio.wait_for(self.connection.wait_synchronized(), timeout=15.0)
            
            self._confidence_status = "LIVE"
            self._last_sync = datetime.utcnow()
            return True
        except asyncio.TimeoutError:
            print(f"MetaApi Timeout for account {self.account_id}")
            self._confidence_status = "DEGRADED"
            return False
        except Exception as e:
            print(f"MetaApi Connection Error for account {self.account_id}: {e}")
            self._confidence_status = "STALE"
            return False

    async def get_account_info(self) -> Dict[str, Any]:
        """
        Fetches account information via RPC.
        """
        if not self.connection:
            await self.connect()

        try:
            account_info = await self.connection.get_account_information()
            self._last_sync = datetime.utcnow()
            self._confidence_status = "LIVE"
            
            return {
                "login": int(account_info['login']),
                "name": account_info['name'],
                "server": account_info['server'],
                "currency": account_info['currency'],
                "leverage": account_info.get('leverage', 100),
                "balance": float(account_info['balance']),
                "equity": float(account_info['equity']),
                "margin": float(account_info['margin']),
                "margin_free": float(account_info['freeMargin']),
                "margin_level": float(account_info.get('marginLevel', 0)),
                "profit": float(account_info.get('profit', 0)), # Note: 'profit' might not be directly in account_info, usually calculated from equity - balance
                "platform": "mt5" if "mt5" in account_info.get('platform', '').lower() else "mt4"
            }
        except Exception as e:
            print(f"Error fetching account info: {e}")
            # Return fallback/empty structure to prevent crash
            return {
                "login": 0, "name": "Error", "server": "", "currency": "USD", "leverage": 1,
                "balance": 0.0, "equity": 0.0, "margin": 0.0, "margin_free": 0.0, "margin_level": 0.0,
                "profit": 0.0, "platform": "error"
            }

    async def get_trades(self) -> List[Dict[str, Any]]:
        """
        Fetches open positions.
        """
        if not self.connection:
            await self.connect()

        try:
            positions = await self.connection.get_positions()
            self._last_sync = datetime.utcnow()
            self._confidence_status = "LIVE"
            
            standardized_trades = []
            for pos in positions:
                standardized_trades.append({
                    "ticket": int(pos['id']),
                    "symbol": pos['symbol'],
                    "type": 'buy' if pos['type'] == 'POSITION_TYPE_BUY' else 'sell',
                    "volume": float(pos['volume']),
                    "open_price": float(pos['openPrice']),
                    "close_price": float(pos['currentPrice']), # For open trades, close price is current price
                    "profit": float(pos['profit']),
                    "open_time": pos['time'], # MetaApi returns ISO string usually
                    "status": "open"
                })
            return standardized_trades
        except Exception as e:
            print(f"Error fetching trades: {e}")
            return []
