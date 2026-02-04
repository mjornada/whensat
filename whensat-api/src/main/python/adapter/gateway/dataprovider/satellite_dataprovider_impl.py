from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session

from src.main.python.domain.entity.satellite import Satellite
from src.main.python.domain.interfaces.dataprovider.satellite_dataprovider import SatelliteDataProvider


class SatelliteDataProviderImpl(SatelliteDataProvider):
    def __init__(self, db: Session):
        self.db = db

    async def save(self, satellite: Satellite) -> Satellite:
        self.db.add(satellite)
        self.db.commit()
        self.db.refresh(satellite)
        return satellite

    async def find_by_id_and_epoch(self, norad_cat_id: int, epoch: datetime) -> Optional[Satellite]:
        return self.db.query(Satellite).filter(
            Satellite.sat_norad_cat_id == norad_cat_id,
            Satellite.sat_epoch == epoch
        ).first()

    async def find_latest_by_norad_id(self, norad_cat_id: int) -> Optional[Satellite]:
        return self.db.query(Satellite).filter(
            Satellite.sat_norad_cat_id == norad_cat_id
        ).order_by(Satellite.sat_epoch.desc()).first()
