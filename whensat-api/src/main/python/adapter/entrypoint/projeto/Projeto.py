from fastapi import APIRouter
from datetime import datetime
import sys
import fastapi

router = APIRouter()

@router.get("/")
async def read_root():
    return {
        "status": "UP",
        "Now": datetime.now().isoformat(),
        "Python Version": f"{sys.version}",
        "FastAPI Version": f"{fastapi.__version__}",
    }

@router.get("/health")
async def health_check():
    return {"status": "UP"}
