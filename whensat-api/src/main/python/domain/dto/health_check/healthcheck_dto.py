from pydantic import BaseModel

class HealthCheckOutputData(BaseModel):
    status: str
