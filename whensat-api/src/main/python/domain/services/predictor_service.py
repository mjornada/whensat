from datetime import datetime, timedelta, timezone
from typing import List, Dict

from skyfield.api import Topos, EarthSatellite


class PredictorService:
    def __init__(self, timescale):
        self.timescale = timescale

    def predict_passes(self,
                       tle_line1: str,
                       tle_line2: str,
                       lat: float,
                       lon: float,
                       days: int = 2,
                       start_time: datetime = None) -> List[Dict]:
        """
        Calcula as próximas passagens de um satélite sobre uma localização geográfica.
        """
        satellite = EarthSatellite(tle_line1, tle_line2, 'Satellite', self.timescale)
        observer = Topos(latitude_degrees=lat, longitude_degrees=lon)

        # Intervalo de tempo para busca (start_time até X dias no futuro)
        if start_time is None:
            start_time = datetime.now(timezone.utc)

        t0 = self.timescale.from_datetime(start_time)
        t1 = self.timescale.from_datetime(start_time + timedelta(days=days))

        # Encontra eventos: 0 = nascimento (rise), 1 = culminação (culmination), 2 = ocaso (set)
        times, events = satellite.find_events(observer, t0, t1, altitude_degrees=0.0)

        passes = []
        current_pass = {}

        for t, event in zip(times, events):
            if event == 0:  # Rise
                current_pass = {
                    "rise": t.utc_datetime().strftime("%d/%m/%Y %H:%M:%S"),
                    "rise_datetime": t.utc_datetime()
                }
            elif event == 1:  # Culmination
                if "rise" in current_pass:
                    # Calcula elevação máxima
                    difference = satellite - observer
                    topocentric = difference.at(t)
                    alt, az, distance = topocentric.altaz()
                    current_pass["max_elevation"] = round(alt.degrees, 2)
            elif event == 2:  # Set
                if "rise" in current_pass:
                    current_pass["set"] = t.utc_datetime().strftime("%d/%m/%Y %H:%M:%S")
                    set_dt = t.utc_datetime()
                    duration_seconds = int((set_dt - current_pass["rise_datetime"]).total_seconds())

                    minutes = duration_seconds // 60
                    seconds = duration_seconds % 60
                    current_pass["duration"] = f"{minutes} min {seconds} sec"

                    # Limpeza para retorno
                    del current_pass["rise_datetime"]
                    passes.append(current_pass)
                    current_pass = {}

        return passes
