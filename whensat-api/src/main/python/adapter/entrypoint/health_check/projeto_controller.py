from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse

from src.main.python.application.factory.container import Container
from src.main.python.application.util.json_enconder import JsonEnconder
from src.main.python.domain.dto.projeto.projeto_dto import ProjetoOutputData
from src.main.python.domain.usecase.projeto.projeto_usecase import ProjetoUseCase

router = APIRouter()


@router.get("/")
@inject
def read_root(
        projeto_usecase: ProjetoUseCase = Depends(Provide[Container.projeto_usecase])
):
    output_data: ProjetoOutputData = projeto_usecase.executar()

    return JSONResponse(
        content=JsonEnconder.to_json(output_data),
        status_code=status.HTTP_200_OK
    )
