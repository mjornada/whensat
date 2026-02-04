from src.main.python.domain.interfaces.integration.celestrak_client import CelestrakClient
from src.main.python.domain.interfaces.dataprovider.satellite_dataprovider import SatelliteDataProvider

class IngestSatelliteDataUseCase:
    def __init__(self, 
                 celestrak_client: CelestrakClient,
                 satellite_dataprovider: SatelliteDataProvider):
        self.celestrak_client = celestrak_client
        self.satellite_dataprovider = satellite_dataprovider

    async def execute(self) -> dict:
        satellites = await self.celestrak_client.get_active_satellites()
        
        count_added = 0
        count_skipped = 0
        
        for satellite in satellites:
            existing = await self.satellite_dataprovider.find_by_id_and_epoch(
                satellite.sat_norad_cat_id, 
                satellite.sat_epoch
            )
            
            if not existing:
                await self.satellite_dataprovider.save(satellite)
                count_added += 1
            else:
                count_skipped += 1
                
        return {
            "total_processed": len(satellites),
            "added": count_added,
            "skipped": count_skipped
        }
