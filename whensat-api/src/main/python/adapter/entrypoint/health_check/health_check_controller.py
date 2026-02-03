from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from src.main.python.application.factory.container import Container
from src.main.python.application.util.json_enconder import JsonEnconder
from src.main.python.domain.dto.health_check.healthcheck_dto import HealthCheckOutputData
from src.main.python.domain.usecase.health_check.healthcheck_usecase import HealthCheckUseCase

router = APIRouter()


@router.get("/health")
@inject
def health_check(
        health_check_usecase: HealthCheckUseCase = Depends(Provide[Container.health_check_usecase])
):
    output_data: HealthCheckOutputData = health_check_usecase.executar()

    return JSONResponse(
        content=JsonEnconder.to_json(output_data),
        status_code=status.HTTP_200_OK
    )
