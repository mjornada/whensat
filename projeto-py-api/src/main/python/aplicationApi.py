import uvicorn
from pyliquibase import Pyliquibase
from hal_config_client_py.HalConfigFacade import HalConfigFacade
from main.python.application.config.FastApiConfig import create_api
import configparser
from logging import INFO
import logging.config


def execut_liquibase():
    config_file = configparser.RawConfigParser()
    variables = hal_config_facade.get_environment('$.source.liquibase')

    config_file['DEFAULT']["changeLogFile"] = hal_config_facade.get_environment('$.source.liquibase.pyliquibase.path')

    for key, value in variables['command'].items():
        config_file['DEFAULT'][f'liquibase.command.{key}'] = value

    with open('../resources/migration/database/liquibase.properties', 'w') as file:
        config_file.write(file)
        file.close()

    # 2 - executar migrations postgres/sqlserver/oracle
    lb_props = '../resources/migration/database/liquibase.properties'
    try:
        liquibase = Pyliquibase(
            defaultsFile=lb_props,
            logLevel='INFO')

        # liquibase.execute('status')
        liquibase.execute('update')
    except Exception as e:
        print(e)
        raise e

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            'format': 'default = %(asctime)s %(levelname)s [%(name)s] %(message)s',
            'datefmt': '[%Y-%m-%d %H:%M:%S]'
        },
        "access": {
            'format': 'access = %(asctime)s %(levelname)s [%(name)s] %(message)s',
            'datefmt': '[%Y-%m-%d %H:%M:%S]'
        },
    },
    "handlers": {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stderr",
        },
        "access": {
            "formatter": "access",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
        },
        'file': {
            'formatter': 'default',
            'class': 'logging.FileHandler',
            # 'mode': 'a',
            'filename': '../migrations.log'
        },
    },
    "loggers": {
        "uvicorn": {"handlers": ["default", "file"], "level": "INFO"},
        "uvicorn.error": {"handlers": ["access", "file"], "level": "INFO"},
        "uvicorn.access": {"handlers": ["access", "file"], "level": "INFO", "propagate": True},
    },
}

if __name__ == "__main__":
    # 1 - executar migrations mongo
    logging.basicConfig(level=INFO)

    hal_config_facade = HalConfigFacade('../resources/application.json')
    hal_config_facade.start()

    logging.config.dictConfig(hal_config_facade.get_environment('$.source.logging_config'))

    # Run once at startup:
    execut_liquibase()

    ### 3 - start applicacao
    uvicorn.run(app=create_api(),
                host="localhost",
                port=4444,
                log_level="info",
                access_log=False,
                use_colors=False,
                )
