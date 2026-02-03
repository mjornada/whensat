from dependency_injector import containers, providers

from src.main.python.domain.usecase.health_check.healthcheck_usecase import HealthCheckUseCase
from src.main.python.domain.usecase.projeto.projeto_usecase import ProjetoUseCase


class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(packages=[
        "adapter.entrypoint.health_check"
    ])

    health_check_usecase = providers.Factory(HealthCheckUseCase)
    projeto_usecase = providers.Factory(ProjetoUseCase)
