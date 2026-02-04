from abc import ABC, abstractmethod
from typing import List
from src.main.python.domain.entity.satellite import Satellite

class CelestrakClient(ABC):
    @abstractmethod
    async def get_active_satellites(self) -> List[Satellite]:
        """
        Busca a lista de satélites ativos do CelesTrak.
        """
        pass
