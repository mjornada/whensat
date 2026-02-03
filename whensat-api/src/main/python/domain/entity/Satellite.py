from sqlalchemy import Column, Integer, String, DateTime, CHAR, Index, func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Satellite(Base):
    __tablename__ = 'satellites'
    __table_args__ = (
        Index('idx_sat_epoch', 'norad_cat_id', 'epoch'),
        {'schema': 'whensat', 'comment': 'Armazena histórico de TLEs (Two-Line Elements) para propagação orbital'}
    )

    norad_cat_id = Column(Integer, primary_key=True, nullable=False)
    object_name = Column(String(255), nullable=False)
    epoch = Column(DateTime(timezone=True), primary_key=True, nullable=False)
    tle_line1 = Column(CHAR(69), nullable=False)
    tle_line2 = Column(CHAR(69), nullable=False)
    created_at = Column(DateTime, server_default=func.now())

    def __repr__(self) -> str:
        return f"<Satellite(norad_cat_id={self.norad_cat_id}, object_name='{self.object_name}', epoch='{self.epoch}')>"
