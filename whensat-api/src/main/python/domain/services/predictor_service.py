from datetime import datetime, timedelta, timezone
from typing import Dict

from skyfield.api import Topos, EarthSatellite


class PredictorService:
    def __init__(self, timescale):
        self.timescale = timescale

    def predict_passes(self,
                       tle_line1: str,
                       tle_line2: str,
                       lat: float,
                       lon: float,
                       days: int = 14,
                       start_time: datetime = None) -> Dict:
        satellite = EarthSatellite(tle_line1, tle_line2, 'Satellite', self.timescale)
        observer = Topos(latitude_degrees=lat, longitude_degrees=lon)

        if self.is_geostationary(satellite):
            return self.get_static_position(satellite, observer)

        if start_time is None:
            start_time = datetime.now(timezone.utc)

        t0 = self.timescale.from_datetime(start_time)
        t1 = self.timescale.from_datetime(start_time + timedelta(days=days))

        times, events = satellite.find_events(observer, t0, t1, altitude_degrees=0.0)

        passes = []
        current_pass = {}

        # Verificação inicial
        difference = satellite - observer
        alt, az, distance = difference.at(t0).altaz()

        if alt.degrees > 0:
            current_pass = {
                "rise": t0.utc_datetime().strftime("%d/%m/%Y %H:%M:%S"),
                "rise_datetime": t0.utc_datetime(),
                "note": "Já estava visível no início da busca"
            }

        for t, event in zip(times, events):
            if event == 0:  # Rise
                current_pass = {
                    "rise": t.utc_datetime().strftime("%d/%m/%Y %H:%M:%S"),
                    "rise_datetime": t.utc_datetime()
                }
            elif event == 1:  # Culmination
                if "rise" in current_pass:
                    topocentric = (satellite - observer).at(t)
                    alt, az, _ = topocentric.altaz()
                    # Conversão crucial para float nativo aqui
                    current_pass["max_elevation"] = round(float(alt.degrees), 2)
            elif event == 2:  # Set
                if "rise" in current_pass:
                    current_pass["set"] = t.utc_datetime().strftime("%d/%m/%Y %H:%M:%S")
                    set_dt = t.utc_datetime()
                    duration_seconds = int((set_dt - current_pass["rise_datetime"]).total_seconds())

                    minutes = duration_seconds // 60
                    seconds = duration_seconds % 60
                    current_pass["duration"] = f"{minutes} min {seconds} sec"

                    del current_pass["rise_datetime"]
                    passes.append(current_pass)
                    current_pass = {}

        return {
            "type": "PASSES_LIST",
            "passes": passes
        }

    def is_geostationary(self, satellite: EarthSatellite) -> bool:
        """
        Um satélite geoestacionário tem um movimento médio de ~1.0027 voltas por dia.
        """
        # O valor está em radianos por minuto no modelo SGP4 interno
        # Convertendo para voltas por dia: (n * 1440) / (2 * pi)
        mean_motion_per_day = float(satellite.model.no_kozai * 1440 / (2 * 3.141592653589793))
        return 0.9 <= mean_motion_per_day <= 1.1

    def get_static_position(self, satellite: EarthSatellite, observer: Topos) -> Dict:
        t_now = self.timescale.now()
        difference = satellite - observer
        alt, az, distance = difference.at(t_now).altaz()

        return {
            "type": "FIXED_POSITION",
            "is_visible": bool(alt.degrees > 0),
            "elevation": round(float(alt.degrees), 2),
            "azimuth": round(float(az.degrees), 2),
            "message": "Satélite geoestacionário. Ele permanece fixo no céu em relação à sua posição."
            if alt.degrees > 0 else
            "Satélite geoestacionário, porém está abaixo do seu horizonte nesta localização."
        }
