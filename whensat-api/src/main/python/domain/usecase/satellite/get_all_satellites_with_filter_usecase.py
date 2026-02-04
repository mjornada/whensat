from typing import List, Optional

from src.main.python.domain.dto.satellite.satellite_summary_dto import SatelliteSummaryDTO
from src.main.python.domain.interfaces.dataprovider.satellite_dataprovider import SatelliteDataProvider


class GetAllSatellitesWithFilterUseCase:
    def __init__(self, satellite_dataprovider: SatelliteDataProvider):
        self.satellite_dataprovider = satellite_dataprovider

    async def execute(self, filter_value: Optional[str] = None) -> List[
        SatelliteSummaryDTO]:
        results = await self.satellite_dataprovider.find_all_with_filter(filter_value)
        return [
            SatelliteSummaryDTO(
                sat_norad_cat_id=row.sat_norad_cat_id,
                sat_object_name=row.sat_object_name
            ) for row in results
        ]
