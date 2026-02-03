from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class SatelliteDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    norad_cat_id: int
    object_name: str
    epoch: datetime
    tle_line1: str
    tle_line2: str
    created_at: Optional[datetime] = None
