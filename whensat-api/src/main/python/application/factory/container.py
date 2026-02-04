from dependency_injector import containers, providers
from skyfield.api import load

from src.main.python.adapter.gateway.dataprovider.satellite_dataprovider_impl import SatelliteDataProviderImpl
from src.main.python.adapter.gateway.integration.celestrak.celestrak_client import CelestrakClientImpl
from src.main.python.application.config.database_config import SessionLocal
from src.main.python.domain.services.predictor_service import PredictorService
from src.main.python.domain.usecase.health_check.healthcheck_usecase import HealthCheckUseCase
from src.main.python.domain.usecase.predictor.satellite_prediction_usecase import SatellitePredictionUseCase
from src.main.python.domain.usecase.projeto.projeto_usecase import ProjetoUseCase
from src.main.python.domain.usecase.satellite.ingest_satellite_data_usecase import IngestSatelliteDataUseCase


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(packages=[
        "src.main.python.adapter.entrypoint.health_check",
        "src.main.python.adapter.entrypoint.satellite"
    ])

    db_session = providers.Resource(SessionLocal)

    skyfield_ts = providers.Singleton(load.timescale)

    celestrak_client = providers.Singleton(CelestrakClientImpl)
    predictor_service = providers.Singleton(
        PredictorService,
        timescale=skyfield_ts
    )

    satellite_dataprovider = providers.Factory(
        SatelliteDataProviderImpl,
        db=db_session
    )

    health_check_usecase = providers.Factory(HealthCheckUseCase)
    projeto_usecase = providers.Factory(ProjetoUseCase)

    ingest_satellite_data_usecase = providers.Factory(
        IngestSatelliteDataUseCase,
        celestrak_client=celestrak_client,
        satellite_dataprovider=satellite_dataprovider
    )

    satellite_prediction_usecase = providers.Factory(
        SatellitePredictionUseCase,
        satellite_dataprovider=satellite_dataprovider,
        predictor_service=predictor_service
    )
