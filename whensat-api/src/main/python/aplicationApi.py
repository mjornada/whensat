import uvicorn
from pyliquibase import Pyliquibase
# from hal_config_client_py.HalConfigFacade import HalConfigFacade
# from main.python.application.config.FastApiConfig import create_api
from application.config.FastApiConfig import create_api
import configparser
from logging import INFO
import logging.config
import os

# --- Configuração de Caminhos Absolutos ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def get_absolute_path(relative_path):
    """Converte um caminho relativo (baseado no script) para absoluto."""
    return os.path.abspath(os.path.join(BASE_DIR, relative_path))


# --- Lógica do Liquibase ---
def execut_liquibase(facade):
    config_file = configparser.RawConfigParser()
    variables = facade.get_environment('$.source.liquibase')

    # Caminho absoluto completo do XML
    xml_full_path = variables['pyliquibase']['path']

    # SEPARAÇÃO CRUCIAL:
    # 1. O diretório entra no searchPath
    xml_dir = os.path.dirname(xml_full_path)
    # 2. Apenas o nome do arquivo entra no changeLogFile
    xml_filename = os.path.basename(xml_full_path)

    # Define caminho absoluto para o arquivo de propriedades
    props_path = get_absolute_path('../resources/migration/database/liquibase.properties')

    os.makedirs(os.path.dirname(props_path), exist_ok=True)

    # Configura o Liquibase corretamente
    config_file['DEFAULT']["searchPath"] = xml_dir
    config_file['DEFAULT']["changeLogFile"] = xml_filename  # Apenas 'master.xml'

    for key, value in variables['command'].items():
        config_file['DEFAULT'][f'liquibase.command.{key}'] = value

    with open(props_path, 'w') as file:
        config_file.write(file)

    try:
        # Pyliquibase lê o arquivo de propriedades configurado acima
        liquibase = Pyliquibase(defaultsFile=props_path)

        # liquibase.execute('status')
        liquibase.execute('update')
    except Exception as e:
        print(f"Erro ao executar Liquibase: {e}")
        raise e


# --- Configuração de Log ---
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


# --- Mock da Configuração ---
class MockHalConfig:
    def __init__(self, path):
        self.path = path

    def start(self):
        pass

    def get_environment(self, query):
        if 'liquibase' in query:
            # Gera o caminho absoluto do XML
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


# --- Execução Principal ---
if __name__ == "__main__":
    logging.basicConfig(level=INFO)

    hal_config_facade = MockHalConfig('../resources/application.json')

    logging.config.dictConfig(hal_config_facade.get_environment('$.source.logging_config'))

    # Run once at startup:
    execut_liquibase(hal_config_facade)

    ### 3 - start applicacao
    uvicorn.run(app=create_api(),
                host="0.0.0.0",
                port=4444,
                log_level="info",
                log_config=LOGGING_CONFIG,
                access_log=False,
                use_colors=False,
                )