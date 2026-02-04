from src.main.python.domain.interfaces.dataprovider.satellite_dataprovider import SatelliteDataProvider
from src.main.python.domain.services.predictor_service import PredictorService
from typing import List, Dict

class SatellitePredictionUseCase:
    def __init__(self, 
                 satellite_dataprovider: SatelliteDataProvider,
                 predictor_service: PredictorService):
        self.satellite_dataprovider = satellite_dataprovider
        self.predictor_service = predictor_service

    async def execute(self, norad_id: int, lat: float, lon: float) -> List[Dict]:
        # Busca o último TLE no banco
        satellite = await self.satellite_dataprovider.find_latest_by_norad_id(norad_id)
        
        if not satellite:
            return []

        # Calcula as passagens
        passes = self.predictor_service.predict_passes(
            satellite.sat_tle_line_one,
            satellite.sat_tle_line_two,
            lat,
            lon
        )

        return passes
