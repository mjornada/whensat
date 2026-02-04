from datetime import datetime
from typing import Optional

from sqlalchemy import String, or_
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

    async def find_all_with_filter(self, filter_value: Optional[str] = None):
        query = self.db.query(
            Satellite.sat_norad_cat_id,
            Satellite.sat_object_name
        ).distinct(Satellite.sat_norad_cat_id)

        if filter_value:
            query = query.filter(
                or_(
                    Satellite.sat_norad_cat_id.cast(String).like(f"%{filter_value}%"),
                    Satellite.sat_object_name.ilike(f"%{filter_value}%")
                )
            )

        return query.all()
