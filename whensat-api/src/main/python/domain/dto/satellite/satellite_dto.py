from datetime import datetime


class SatelliteDTO:
    def __init__(self,
                 sat_norad_cat_id=int,
                 sat_object_name=str,
                 sat_epoch=datetime,
                 sat_tle_line_one=str,
                 sat_tle_line_two=str,
                 sat_created_at=datetime
                 ) -> None:
        self.sat_norad_cat_id = sat_norad_cat_id
        self.sat_object_name = sat_object_name
        self.sat_epoch = sat_epoch
        self.sat_tle_line_one = sat_tle_line_one
        self.sat_tle_line_two = sat_tle_line_two
        self.sat_created_at = sat_created_at
