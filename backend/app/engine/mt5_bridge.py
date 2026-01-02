import random
from datetime import datetime
from typing import List, Dict

from app.engine.broker.base import BrokerConnector

class MT5Bridge(BrokerConnector):
    """
    A Bridge to connect to MT5.
    Since we are on macOS and cannot run MT5 natively for this MVP,
    this class simulates a connection and returns realistic mock data.
    """
    def __init__(self, mode="mock"):
        self.mode = mode
        self.connected = False
        self._last_sync = datetime.utcnow()
        self._confidence_status = "LIVE"
        self.demo_mode = False # If True, simulate risk violations
        
    @property
    def last_sync(self) -> datetime:
        return self._last_sync

    @property
    def confidence_status(self) -> str:
        return self._confidence_status

    async def connect(self):
        """Simulate connection delay"""
        self.connected = True
        self._last_sync = datetime.utcnow()
        return True
        
    async def get_account_info(self) -> Dict:
        """Returns mock account status"""
        base_balance = 100000.0
        
        if self.demo_mode:
            # Simulate high drawdown (near 10% max)
            equity = base_balance - 9200 # $9,200 loss on $100k
            profit = -9200
        else:
            fluctuation = random.uniform(-500, 1500)
            equity = base_balance + fluctuation + random.uniform(-200, 200)
            profit = fluctuation

        return {
            "login": 12345678,
            "name": "Demo Trader",
            "server": "MetaQuotes-Demo",
            "currency": "USD",
            "leverage": 100,
            "balance": base_balance,
            "equity": equity,
            "margin": 1340.0,
            "margin_free": equity - 1340.0,
            "margin_level": 7500.0,
            "profit": profit,
            "platform": "mt5"
        }

    async def get_trades(self) -> List[Dict]:
        """Returns a list of mock active trades"""
        trades = []
        symbols = ["EURUSD", "GBPUSD", "XAUUSD", "US30"]
        
        if self.demo_mode:
            # Simulate excessive lot size (e.g. 15 lots)
            trades.append({
                "ticket": 9999,
                "symbol": "XAUUSD",
                "type": "buy",
                "volume": 15.0, # Excessive lot size
                "open_price": 2045.50,
                "current_price": 2043.20,
                "sl": 2030.00,
                "tp": 2080.00,
                "profit": -3450.0
            })
        else:
            # Generate 1-3 random normal trades
            for i in range(random.randint(1, 3)):
                symbol = random.choice(symbols)
                is_buy = random.choice([True, False])
                price = 1.0500 if "USD" in symbol else 2000.0
                
                trades.append({
                    "ticket": 1000 + i,
                    "symbol": symbol,
                    "type": "buy" if is_buy else "sell",
                    "volume": random.choice([0.1, 0.5, 1.0]),
                    "open_price": price,
                    "current_price": price + random.uniform(-0.0020, 0.0020),
                    "sl": price - 0.0100,
                    "tp": price + 0.0200,
                    "profit": random.uniform(-50.0, 150.0)
                })
            
        return trades
        
    async def toggle_demo_mode(self, enabled: bool):
        self.demo_mode = enabled
        print(f"MT5Bridge Demo Mode: {'ENABLED' if enabled else 'DISABLED'}")
        return {"demo_mode": self.demo_mode}

    def get_daily_stats(self) -> Dict:
        """Simulate daily P/L for risk calculations"""
        return {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "daily_profit": random.uniform(-2000, 1000), # Can test risk violations here
            "trades_count": random.randint(0, 10)
        }

# Singleton instance
mt5_service = MT5Bridge()
