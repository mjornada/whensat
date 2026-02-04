from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from src.main.python.application.config.db.base import Base


class Satellite(Base):
    __tablename__ = "tb_satellites"
    __table_args__ = {"schema": "whensat"}

    sat_norad_cat_id = Column(Integer, primary_key=True, autoincrement=False)
    sat_epoch = Column(DateTime(timezone=False), primary_key=True)
    sat_object_name = Column(String(255))
    sat_tle_line_one = Column(String(69))
    sat_tle_line_two = Column(String(69))
    sat_created_at = Column(DateTime(timezone=False), default=datetime.utcnow)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
