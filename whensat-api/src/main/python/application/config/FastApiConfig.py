from fastapi import FastAPI
import logging
import uvicorn


def create_api():
    app = FastAPI()

    @app.on_event("startup")
    def startup_event():
        pass
        # uvicorn_error = logging.getLogger("uvicorn.error")
        # uvicon_access = logging.getLogger("uvicorn.access")
        # uvicorn_logger = logging.getLogger("uvicorn")
        #
        # formatter = logging.Formatter(fmt="%(asctime)s %(levelname)s [%(name)s] %(message)s",
        #                               datefmt="[%Y-%m-%d %H:%M:%S]")
        # fh1 = logging.FileHandler("application.log")
        # fh1.setFormatter(formatter)
        #
        # uvicorn_error.addHandler(fh1)
        # uvicon_access.addHandler(fh1)
        # uvicorn_logger.addHandler(fh1)

        #formatter = logging.Formatter("%(asctime)s %(levelname)s [%(name)s] %(message)s")
        #uvicorn_error.setFormatter(formatter)
        #uvicon_access.setFormatter(formatter)

    from main.python.adapter.entrypoint.projeto import Projeto
    # app.include_router(ReadRoot.router)
    # app.include_router(ReadCliente.router_users)
    # app.include_router(CreateCliente.router_users_create)
    # app.include_router(ReadClienteID.router_users_id)
    app.include_router(Projeto.router)

    return app
