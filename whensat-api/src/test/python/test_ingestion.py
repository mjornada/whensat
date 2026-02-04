# import pytest
import asyncio
from unittest.mock import MagicMock, AsyncMock
from datetime import datetime
from src.main.python.adapter.gateway.integration.celestrak.celestrak_client import CelestrakClientImpl
from src.main.python.domain.entity.satellite import Satellite

def test_parse_tle():
    client = CelestrakClientImpl()
    name = "ISS (ZARYA)"
    line1 = "1 25544U 98067A   24034.56845347  .00015949  00000-0  28263-3 0  9993"
    line2 = "2 25544  51.6416 191.0125 0004457  64.5501  20.0814 15.49528409437992"
    
    satellite = client._parse_tle(name, line1, line2)
    
    assert satellite.sat_norad_cat_id == 25544
    assert satellite.sat_object_name == name
    assert isinstance(satellite.sat_epoch, datetime)
    assert satellite.sat_tle_line_one == line1
    assert satellite.sat_tle_line_two == line2

# @pytest.mark.asyncio
async def test_ingest_usecase():
    from src.main.python.domain.usecase.satellite.ingest_satellite_data_usecase import IngestSatelliteDataUseCase
    
    # Mocks
    mock_client = AsyncMock()
    mock_dataprovider = AsyncMock()
    
    sat1 = Satellite(sat_norad_cat_id=1, sat_epoch=datetime(2024, 1, 1), sat_object_name="SAT1")
    sat2 = Satellite(sat_norad_cat_id=2, sat_epoch=datetime(2024, 1, 1), sat_object_name="SAT2")
    
    mock_client.get_active_satellites.return_value = [sat1, sat2]
    
    # Simular que sat1 já existe e sat2 não
    mock_dataprovider.find_by_id_and_epoch.side_effect = [sat1, None]
    
    use_case = IngestSatelliteDataUseCase(mock_client, mock_dataprovider)
    result = await use_case.execute()
    
    assert result["total_processed"] == 2
    assert result["added"] == 1
    assert result["skipped"] == 1
    
    mock_dataprovider.save.assert_called_once_with(sat2)

if __name__ == "__main__":
    # Teste rápido de parsing sem pytest
    test_parse_tle()
    print("Test parse TLE: OK")
    
    # Teste do UseCase
    asyncio.run(test_ingest_usecase())
    print("Test Ingest UseCase: OK")
