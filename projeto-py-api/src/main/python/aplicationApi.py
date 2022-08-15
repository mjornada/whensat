import datetime
import sys
import uvicorn
import logging
from datetime import date
from pyliquibase import Pyliquibase

from main.python.application.config.FastApiConfig import create_api

if __name__ == "__main__":

    # 1 - executar migrations mongo
    # TODO: migrations mongo usando Hal-Config-Migrations-Py

    hal-config-facede.get_proper("liquibase")

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

    ### 3 - start applicacao
    uvicorn.run(app=create_api(),
                host="localhost",
                port=4444,
                log_level="info",
                access_log=False,
                use_colors=False,
                )
