from typing import List, Optional

from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends, Query

from src.main.python.application.factory.container import Container
from src.main.python.domain.dto.satellite.satellite_summary_dto import SatelliteSummaryDTO
from src.main.python.domain.usecase.satellite.get_all_satellites_with_filter_usecase import \
    GetAllSatellitesWithFilterUseCase

router = APIRouter(prefix="/satellites", tags=["satellites"])


@router.get("/all", response_model=List[SatelliteSummaryDTO])
@inject
async def get_all_satellites_with_filter(
        filter: Optional[str] = Query(None),
        use_case: GetAllSatellitesWithFilterUseCase = Depends(Provide[Container.get_all_satellites_with_filter_usecase])
):
    result = await use_case.execute(filter_value=filter)
    return result
