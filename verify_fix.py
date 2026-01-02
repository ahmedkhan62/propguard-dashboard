import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.engine.risk import risk_engine

print("Testing RiskEngine.get_daily_stats...")

trades = [
    {"profit": 100.0, "volume": 0.1},
    {"profit": -50.0, "volume": 0.05}
]

try:
    stats = risk_engine.get_daily_stats(trades)
    print("Success! Stats:", stats)
    
    expected_profit = 50.0
    if stats['daily_profit'] == expected_profit:
        print("Verification PASSED: Daily profit calculation is correct.")
    else:
        print(f"Verification FAILED: Expected {expected_profit}, got {stats['daily_profit']}")
except Exception as e:
    import traceback
    traceback.print_exc()
    print("Verification FAILED with exception:", e)
