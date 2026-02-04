from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from src.main.python.application.factory.container import Container
from src.main.python.domain.usecase.satellite.ingest_satellite_data_usecase import IngestSatelliteDataUseCase

router = APIRouter(prefix="/satellites", tags=["satellites"])

@router.post("/ingest")
@inject
async def ingest_satellites(
    use_case: IngestSatelliteDataUseCase = Depends(Provide[Container.ingest_satellite_data_usecase])
):
    result = await use_case.execute()
    return JSONResponse(
        content=result,
        status_code=status.HTTP_200_OK
    )
