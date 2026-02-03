import uvicorn
from pyliquibase import Pyliquibase
from application.config.FastApiConfig import create_api
import configparser
from logging import INFO
import logging.config
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_absolute_path(relative_path):
    """Converte um caminho relativo (baseado no script) para absoluto."""
    return os.path.abspath(os.path.join(BASE_DIR, relative_path))


def execut_liquibase(facade):
    config_file = configparser.RawConfigParser()
    variables = facade.get_environment('$.source.liquibase')

    xml_full_path = variables['pyliquibase']['path']

    xml_dir = os.path.dirname(xml_full_path)

    xml_filename = os.path.basename(xml_full_path)

    props_path = get_absolute_path('../resources/migration/database/liquibase.properties')

    os.makedirs(os.path.dirname(props_path), exist_ok=True)

    config_file['DEFAULT']["searchPath"] = xml_dir
    config_file['DEFAULT']["changeLogFile"] = xml_filename  # Apenas 'master.xml'

    for key, value in variables['command'].items():
        config_file['DEFAULT'][f'liquibase.command.{key}'] = value

    with open(props_path, 'w') as file:
        config_file.write(file)

    try:
        liquibase = Pyliquibase(defaultsFile=props_path)

        liquibase.execute('update')
    except Exception as e:
        print(f"Erro ao executar Liquibase: {e}")
        raise e


log_file_path = get_absolute_path('../migrations.log')

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
            'filename': log_file_path
        },
    },
    "loggers": {
        "uvicorn": {"handlers": ["default", "file"], "level": "INFO"},
        "uvicorn.error": {"handlers": ["access", "file"], "level": "INFO"},
        "uvicorn.access": {"handlers": ["access", "file"], "level": "INFO", "propagate": True},
    },
}


class MockHalConfig:
    def __init__(self, path):
        self.path = path

    def start(self):
        pass

    def get_environment(self, query):
        if 'liquibase' in query:
            xml_absolute_path = get_absolute_path('../resources/migration/database/master.xml')

            return {
                'command': {
                    'url': os.getenv('DATABASE_URL', 'jdbc:postgresql://localhost/ws'),
                    'username': os.getenv('DATABASE_USER', 'postgres'),
                    'password': os.getenv('DATABASE_PASSWORD', 'postgres'),
                },
                'pyliquibase': {'path': xml_absolute_path}
            }
        if 'logging_config' in query:
            return LOGGING_CONFIG
        return {}


if __name__ == "__main__":
    logging.basicConfig(level=INFO)

    hal_config_facade = MockHalConfig('../resources/application.json')

    logging.config.dictConfig(hal_config_facade.get_environment('$.source.logging_config'))

    execut_liquibase(hal_config_facade)

    uvicorn.run(app=create_api(),
                host="0.0.0.0",
                port=4444,
                log_level="info",
                log_config=LOGGING_CONFIG,
                access_log=False,
                use_colors=False,
                )