from datetime import datetime


class Satellite:
    def __init__(self,
                 sat_norad_cat_id: int | None = None,
                 sat_object_name: str | None = None,
                 sat_epoch: datetime | None = None,
                 sat_tle_line_one: str | None = None,
                 sat_tle_line_two: str | None = None,
                 sat_created_at: datetime | None = None
                 ) -> None:
        self.sat_norad_cat_id = sat_norad_cat_id
        self.sat_object_name = sat_object_name
        self.sat_epoch = sat_epoch
        self.sat_tle_line_one = sat_tle_line_one
        self.sat_tle_line_two = sat_tle_line_two
        self.sat_created_at = sat_created_at
