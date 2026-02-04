from dependency_injector import containers, providers

from src.main.python.domain.usecase.health_check.healthcheck_usecase import HealthCheckUseCase
from src.main.python.domain.usecase.projeto.projeto_usecase import ProjetoUseCase
from src.main.python.domain.usecase.satellite.ingest_satellite_data_usecase import IngestSatelliteDataUseCase
from src.main.python.adapter.gateway.integration.celestrak.celestrak_client import CelestrakClientImpl
from src.main.python.adapter.gateway.dataprovider.satellite_dataprovider_impl import SatellitePostgresDataProvider
from src.main.python.application.config.database_config import SessionLocal


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(packages=[
        "src.main.python.adapter.entrypoint.health_check",
        "src.main.python.adapter.entrypoint.satellite"
    ])

    db_session = providers.Resource(SessionLocal)

    celestrak_client = providers.Singleton(CelestrakClientImpl)
    
    satellite_dataprovider = providers.Factory(
        SatellitePostgresDataProvider,
        db=db_session
    )

    health_check_usecase = providers.Factory(HealthCheckUseCase)
    projeto_usecase = providers.Factory(ProjetoUseCase)
    
    ingest_satellite_data_usecase = providers.Factory(
        IngestSatelliteDataUseCase,
        celestrak_client=celestrak_client,
        satellite_dataprovider=satellite_dataprovider
    )
