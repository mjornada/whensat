from src.main.python.domain.dto.projeto.projeto_dto import ProjetoOutputData
from datetime import datetime
import sys
import fastapi

class ProjetoUseCase:
    def executar(self) -> ProjetoOutputData:
        return ProjetoOutputData(
            status="UP",
            now=datetime.now().isoformat(),
            python_version=f"{sys.version}",
            fastapi_version=f"{fastapi.__version__}"
        )
