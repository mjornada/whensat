from typing import Dict

from src.main.python.domain.interfaces.dataprovider.satellite_dataprovider import SatelliteDataProvider
from src.main.python.domain.services.predictor_service import PredictorService


class SatellitePredictionUseCase:
    def __init__(self,
                 satellite_dataprovider: SatelliteDataProvider,
                 predictor_service: PredictorService):
        self.satellite_dataprovider = satellite_dataprovider
        self.predictor_service = predictor_service

    async def execute(self, norad_id: int, lat: float, lon: float) -> Dict:
        satellite = await self.satellite_dataprovider.find_latest_by_norad_id(norad_id)

        if not satellite:
            # Retorno seguindo o padrão de erro da sua aplicação
            return {"type": "ERROR", "message": f"Satélite {norad_id} não encontrado."}

        # O PredictorService agora garante tipos nativos do Python
        return self.predictor_service.predict_passes(
            satellite.sat_tle_line_one,
            satellite.sat_tle_line_two,
            lat,
            lon
        )
