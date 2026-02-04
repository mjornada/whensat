from fastapi import FastAPI


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

        # formatter = logging.Formatter("%(asctime)s %(levelname)s [%(name)s] %(message)s")
        # uvicorn_error.setFormatter(formatter)
        # uvicon_access.setFormatter(formatter)

    # from main.python.adapter.entrypoint.projeto import Projeto
    # from adapter.entrypoint.projeto import Projeto
    from src.main.python.application.factory.container import Container

    container = Container()
    app.container = container

    from src.main.python.adapter.entrypoint.health_check import health_check_controller
    from src.main.python.adapter.entrypoint.health_check import projeto_controller
    from src.main.python.adapter.entrypoint.satellite import satellite_ingest_controller, satellite_predict_controller

    app.include_router(health_check_controller.router)
    app.include_router(projeto_controller.router)
    app.include_router(satellite_ingest_controller.router)
    app.include_router(satellite_predict_controller.router)

    return app
