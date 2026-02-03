from abc import ABC, abstractmethod
from typing import List, Optional
from domain.entity.Satellite import Satellite

class SatelliteDataProvider(ABC):
    @abstractmethod
    async def save(self, satellite: Satellite) -> Satellite:
        pass

    @abstractmethod
    async def find_by_id_and_epoch(self, norad_cat_id: int, epoch) -> Optional[Satellite]:
        pass

    @abstractmethod
    async def find_latest_by_norad_id(self, norad_cat_id: int) -> Optional[Satellite]:
        pass
