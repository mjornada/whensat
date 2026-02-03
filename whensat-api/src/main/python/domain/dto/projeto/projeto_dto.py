from pydantic import BaseModel

class ProjetoOutputData(BaseModel):
    status: str
    now: str
    python_version: str
    fastapi_version: str
