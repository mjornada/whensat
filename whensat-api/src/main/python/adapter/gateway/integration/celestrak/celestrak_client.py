import httpx
from typing import List
from datetime import datetime
from sgp4.api import Satrec
from src.main.python.domain.entity.satellite import Satellite
from src.main.python.domain.interfaces.integration.celestrak_client import CelestrakClient

class CelestrakClientImpl(CelestrakClient):
    def __init__(self):
        self.url = "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle"

    async def get_active_satellites(self) -> List[Satellite]:
        async with httpx.AsyncClient(timeout=300.0) as client:
            response = await client.get(self.url)
            response.raise_for_status()
            
            lines = response.text.splitlines()
            satellites = []
            
            # CelesTrak TLE format is 3 lines per satellite:
            # 0: Name
            # 1: Line 1
            # 2: Line 2
            for i in range(0, len(lines) - 2, 3):
                name = lines[i].strip()
                line1 = lines[i+1].strip()
                line2 = lines[i+2].strip()
                
                try:
                    satellite = self._parse_tle(name, line1, line2)
                    satellites.append(satellite)
                except Exception as e:
                    # Log error and continue with next
                    print(f"Error parsing TLE for {name}: {e}")
            
            return satellites

    def _parse_tle(self, name: str, line1: str, line2: str) -> Satellite:
        # Use sgp4 to parse TLE and get epoch
        satrec = Satrec.twoline2rv(line1, line2)
        
        # Using the standard JD to datetime conversion
        jd = satrec.jdsatepoch + satrec.jdsatepochF
        epoch = self._jd_to_datetime(jd)
        
        return Satellite(
            sat_norad_cat_id=satrec.satnum,
            sat_object_name=name,
            sat_epoch=epoch,
            sat_tle_line_one=line1,
            sat_tle_line_two=line2,
            sat_created_at=datetime.utcnow()
        )

    def _jd_to_datetime(self, jd: float) -> datetime:
        unixtime = (jd - 2440587.5) * 86400.0
        return datetime.utcfromtimestamp(unixtime)
