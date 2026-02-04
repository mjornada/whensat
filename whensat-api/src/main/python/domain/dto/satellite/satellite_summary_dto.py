from pydantic import BaseModel


class SatelliteSummaryDTO(BaseModel):
    sat_norad_cat_id: int
    sat_object_name: str

    class Config:
        orm_mode = True
