from src.main.python.domain.dto.health_check.healthcheck_dto import HealthCheckOutputData


class HealthCheckUseCase:
    def executar(self) -> HealthCheckOutputData:
        return HealthCheckOutputData(status="UP")
