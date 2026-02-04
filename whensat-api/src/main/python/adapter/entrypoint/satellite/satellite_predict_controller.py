from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends, status, Query
from fastapi.responses import JSONResponse

from src.main.python.application.factory.container import Container
from src.main.python.domain.usecase.predictor.satellite_prediction_usecase import SatellitePredictionUseCase

router = APIRouter(prefix="/satellites", tags=["satellites"])


@router.get("/{norad_id}/predict")
@inject
async def predict_passes(
        norad_id: int,
        lat: float = Query(..., description="Latitude do observador"),
        lon: float = Query(..., description="Longitude do observador"),
        use_case: SatellitePredictionUseCase = Depends(Provide[Container.satellite_prediction_usecase])
):
    result = await use_case.execute(norad_id, lat, lon)
    return JSONResponse(
        content=result,
        status_code=status.HTTP_200_OK
    )
