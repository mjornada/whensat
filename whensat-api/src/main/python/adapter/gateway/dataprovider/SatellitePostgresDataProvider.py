from sqlalchemy.orm import Session
from typing import Optional
from domain.entity.Satellite import Satellite
from domain.interfaces.dataprovider.SatelliteDataProvider import SatelliteDataProvider

class SatellitePostgresDataProvider(SatelliteDataProvider):
    def __init__(self, db: Session):
        self.db = db

    async def save(self, satellite: Satellite) -> Satellite:
        self.db.add(satellite)
        self.db.commit()
        self.db.refresh(satellite)
        return satellite

    async def find_by_id_and_epoch(self, norad_cat_id: int, epoch) -> Optional[Satellite]:
        return self.db.query(Satellite).filter(
            Satellite.norad_cat_id == norad_cat_id,
            Satellite.epoch == epoch
        ).first()

    async def find_latest_by_norad_id(self, norad_cat_id: int) -> Optional[Satellite]:
        return self.db.query(Satellite).filter(
            Satellite.norad_cat_id == norad_cat_id
        ).order_by(Satellite.epoch.desc()).first()
