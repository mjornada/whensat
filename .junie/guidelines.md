### Diretrizes de Desenvolvimento - Projeto Whensat

Este documento define os padrões e diretrizes para o desenvolvimento do projeto Whensat, baseando-se na arquitetura definida em `docs/arquitetura.md`.

---

#### 1. Arquitetura Geral
O sistema segue os princípios de **Clean Architecture** e **Clean Code**, dividindo-se em camadas bem definidas para garantir a separação de responsabilidades e a manutenibilidade do código.

*   **Lógica de Negócio (Astrodinâmica):** Deve estar isolada das infraestruturas (banco de dados e API).
*   **Entrypoint (Adaptadores de Entrada):** Camada de interface (REST API, Jobs, Listeners de Fila).
*   **Gateway (Adaptadores de Saída):** Comunicação com banco de dados (DataProviders) e serviços externos (Integrações).
*   **Application:** Configuração, injeção de dependências (Factories) e parâmetros.
*   **Domain:** Núcleo do negócio (Casos de Uso, Entidades, Interfaces de Gateways).

---

#### 2. Backend (whensat-api)
Implementado em **Python 3.10+** utilizando **FastAPI**.

**2.1 Estrutura de Pastas**
A estrutura deve seguir o padrão definido na arquitetura, adaptado para Python:
```text
whensat-api/src/main/python/
├── adapter/
│   ├── entrypoint/      # Controllers FastAPI
│   └── gateway/
│       ├── dataprovider/ # Persistência (PostgreSQL)
│       ├── integration/  # APIs externas (ex: CelesTrak)
│       └── cache/        # Camada de Cache (Redis)
├── application/
│   ├── config/          # Configurações do FastAPI, etc.
│   └── factory/         # Instanciação de UseCases e Injeção de Dep.
└── domain/
    ├── dto/             # Objetos de transferência
    ├── entity/          # Modelos de domínio (SQLAlchemy/Pydantic)
    ├── interfaces/      # Abstrações (Protocols ou ABCs)
    └── usecase/         # Lógica de negócio pura (Skyfield, sgp4)
```

**2.2 Padrões de Codificação**
*   **Nomenclatura:** Seguir o [PEP 8](https://peps.python.org/pep-0008/). Classes em `PascalCase`, funções/variáveis em `snake_case`.
*   **Tipagem:** Utilizar *Type Hints* do Python em todos os métodos e funções.
*   **Assincronismo:** Preferir `async/await` para operações de I/O (requisições, banco de dados).
*   **Performance:** Utilizar a camada estratégica de cache (Redis) para minimizar a latência em cálculos intensivos de propagação orbital.

**2.3 Banco de Dados e Migrações**
*   Utilizamos **PostgreSQL** para persistência e versionamento de TLEs.
*   Utilizamos **Liquibase** para versionamento de banco de dados.
*   Arquivos de migração ficam em `whensat-api/src/main/resources/migration/`.
*   Nunca alterar uma migração já executada; sempre criar um novo changeset.

---

#### 3. Frontend (whensat-app)
Implementado em **Vue.js 2** com **Vuetify** e **Vuex**.

**3.1 Estrutura de Pastas**
```text
whensat-app/src/
├── application/         # Inicialização e Engine do App
├── core/
│   ├── apiclient/       # Chamadas HTTP (Axios)
│   ├── store/           # Estado global (Vuex)
│   └── utils/           # Funções utilitárias
├── plugins/             # Configurações de plugins (Vuetify, Router)
└── views/
    ├── components/      # Componentes compartilhados
    └── pages/           # Telas do sistema
```

**3.2 Padrões de Codificação**
*   **Nomenclatura:** Componentes Vue em `PascalCase` no arquivo e `kebab-case` no template.
*   **Vuex:** Centralizar a lógica de dados na Store. Utilizar `actionTypes` e `mutationTypes` para evitar strings mágicas.
*   **Estilização:** Preferir o uso de classes utilitárias do Vuetify ou Stylus quando necessário (no bloco `<style scoped>`).

---

#### 4. Tratamento de Erros e Logs
*   **Backend:** Utilizar o tratamento global de exceções na camada de Entrypoint. Logs devem ser configurados via `logging.config` e persistidos em arquivo conforme definido em `aplicationApi.py`.
*   **Frontend:** Utilizar o `ExceptionHandler` centralizado e mostrar notificações ao usuário através de mixins de alerta.

---

#### 5. Testes
*   **Backend:** Testes devem ser criados em `whensat-api/src/test/python/` utilizando `pytest`.
*   **Frontend:** Testes unitários com `Jest` acompanhando o arquivo fonte (ex: `Componente.spec.js`).
