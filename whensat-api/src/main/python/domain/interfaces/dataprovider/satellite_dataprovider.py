from abc import ABC, abstractmethod
from typing import Optional

from src.main.python.domain.entity.satellite import Satellite


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

    @abstractmethod
    async def find_all_with_filter(self, filter_value: Optional[str] = None):
        pass
