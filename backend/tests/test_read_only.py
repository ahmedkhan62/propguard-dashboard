import pytest
from app.engine.broker.metaapi import MetaApiConnector
from app.engine.mt5_bridge import MT5Bridge

def test_metaapi_read_only_guards():
    connector = MetaApiConnector("fake_token", "fake_id")
    
    with pytest.raises(NotImplementedError) as excinfo:
        connector.place_order(symbol="XAUUSD", volume=0.1, type="buy")
    assert "read-only by design" in str(excinfo.value)

    with pytest.raises(NotImplementedError) as excinfo:
        connector.modify_order(ticket=123, stop_loss=1900)
    assert "read-only by design" in str(excinfo.value)

def test_mt5_bridge_read_only_guards():
    connector = MT5Bridge()
    
    with pytest.raises(NotImplementedError) as excinfo:
        connector.place_order(symbol="XAUUSD", volume=0.1, type="buy")
    assert "read-only by design" in str(excinfo.value)
