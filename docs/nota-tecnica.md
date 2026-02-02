# Nota Técnica

## Informações de implantação e configurações do Compra Direta Eletrônica.

**Índice de Conteúdo**

* [1. Objetivo](#1-objetivo "Pré-requisitos para a execução deste projeto")
* [2. Pré-requisitos](#2-pré-requisitos "Objetivo desta nota técnica")
    * [2.1. Requisitos de Hardware](#21-requisitos-de-hardware "Requisitos de hardware do sistema")
    * [2.1.1. Projeto API](#211-projeto-api "Requisitos de hardware para o Projeto API")
    * [2.1.2. Projeto APP](#212-projeto-app "Requisitos de hardware para o Projeto APP")
* [3. Dependências](#3-dependências "Dependências")
* [4. Variáveis de Ambiente](#4-variáveis-de-ambiente "Configuração das variáveis de ambiente")
* [5. Docker Project](#5-docker-project "Docker Project")
* [6. Configurações no Setup](#6-configurações-no-setup "Como configurar o Setup")
    * [6.1. Parâmetros de Configuração](#61-parâmetros-de-configuração "Parâmetros de configurações do Projeto")

## 1. Objetivo

Este documento tem como objetivo repassar o conhecimento técnico obtido no processo de desenvolvimento do produto Projeto, constam aqui as configurações e informações necessárias para que seja feita a implantação do sistema de maneira correta.

## 2. Pré-requisitos

Para rodar o projeto, você deve ter instalado:

* Docker - [Download](https://www.docker.com/)

### 2.1. Requisitos de Hardware

#### 2.1.1. Projeto API:

| | Memória RAM | Disco| vCPU |
|---|---|---|---|
| Mínimo| 2048MB | 1GB | 2 |
| Recomendado | > 2048MB | > 1 GB | 4

#### 2.1.2. Projeto APP:

| | Memória RAM | Disco| vCPU |
|---|---|---|---|
| Mínimo| 500MB | 1GB | 2 |
| Recomendado | 1GB | > 1 GB | 4

## 3. Dependências

Existem *dependências de runtime* com outras aplicações, estas estão listadas a baixo e precisam ser iniciadas antes
do Projeto:

| Nome               | Versão |
|--------------------|---|
| REDIS              | 4-alpine |
| RABBITMQ           | 3-management-alpine |
| HAL-CONFIG         | 3.4.0+ |
| HAL-DISCOVERY      | 3.2.1+ |
| HAL-GATEWAY2       | 1.9.0-TREINAMENTO+ |
| SETUP-ADMIN-APP    | 4.2.1-ALPHA.10+ |
| SETUP-ADMIN-API    | 4.2.1-ALPHA.10+ |
| SETUP-PUBLIC-API   | 4.2.1-ALPHA.10+ |
| HAL-KEYCLOAK       | 1.10.0-TREINAMENTO.1+ |
| SETUP-SESSION-API  | 4.2.1-ALPHA.10+ |
| SETUP-CONSULTA-API | 4.2.1-ALPHA.10+ |

## 4. Variáveis de Ambiente

As variáveis de ambiente, estão listadas abaixo na tabela:

| Variável | Valor | Descrição                           |
|---|---|-------------------------------------|
| DEVELOPMENT | false | Define se será ambiente de desenvolvimento. |
| SSL | false | Define o uso de SSL.                |
| SSL_EMAIL | e@mail.com | Email usado em determinadas situações quando SSL está habilitado. |
| SSL_USE_CUSTOM_CERTIFICATE | false | Define o uso de certificado digital customizado do hal-gateway2. |
| TZ | America/Sao_Paulo | Fuso horário.                       |
| DOMAIN | localhost | Endereço de domínio.                |
||||
| RABBITMQ_HOST | rabbitmq | Endereço do RabbitMQ.               |
| RABBITMQ_PORT | 5672 | Porta do RabbitMQ.                  |
| RABBITMQ_USERNAME | rabbitmq | Usuário do RabbitMQ.                |
| RABBITMQ_PASSWORD | rabbitmq | Senha do RabbitMQ.                  |
||||
| REDIS_HOST | redis | Endereço do Redis.                  |
| REDIS_PORT | 6379 | Porta do Redis.                     |
| REDIS_PASSWORD | redis | Senha do Redis.                     |
||||
| MONGODB_HOST | mongo | Endereço do MongoDB.                |
| MONGODB_PORT | 27017 | Porta do MongoDB.                   |
| MONGODB_USERNAME | mongo | Usuário do MongoDB.                 |
| MONGODB_PASSWORD | mongo | Senha do MongoDB.                   |
| MONGODB_CONFIG_DB | config-db | Nome da base de dados do hal-config. |
||||
| POSTGRES_USER, DATABASE_USERNAME, DATABASE_USER | postgres | Usuário do banco de dados.          |
| POSTGRES_PASSWORD,DATABASE_PASSWORD | postgres | Senha do banco de dados.            |
| DATABASE_HOST | database | Host do banco de dados.             |
| DATABASE_PORT | 5432 | Porta do banco de dados.            |
| DATABASE_NAME | az | Nome do banco de dados.             |
| DATABASE_URL | jdbc:postgresql://database:5432/az | Endereço do banco de dados.         |
| DATABASE_URL_NODB | jdbc:postgresql://database:5432/ | Endereço do banco de dados sem o nome do banco. |
| DATABASE_CLASSNAME | org.postgresql.Driver | Nome do driver do banco utilizado.  |
| DATABASE_PLATFORM | org.hibernate.dialect.PostgreSQLDialect | Endereço do banco de dados.         |
| DATABASE_VALIDATION_QUERY, VALIDATION_QUERY | SELECT 1 | Configuração da query.              |
| DATABASE_VENDOR | postgres, oracle ou mssql | Fornecedor banco de dados a ser utilizado. |
| LIQUIBASE_CONTEXTS | desenv | Liquibase.                          |
||||
| HAL_DISCOVERY_HOST | hal-discovery | Host do hal-discovery               |
| HAL_DISCOVERY_PORT | 8001 | Porta do hal-discovery              |
| CLOUD_CONFIG_URI, HAL_CONFIG_URL | http://hal-config:8000 | Endereço do hal-config.             |
| HAL_DISCOVERY_URL | http://hal-discovery:8001 | Endereço do hal-discovery.          |
| HAL_GATEWAY_DEFAULT_ROUTE | /flowbee | Redirecionamento do path raiz ("/"). |
||||
| JIRA_URL | https://aztecnologia.atlassian.net | Url base para acessar a api do Jira |
| JIRA_TOKEN | bGludXguYmluZEBhemkuY29tLmJyOnVnZHQzMmlKNEx0SWdWUXdwTjZMN0EyOA== | Token para acessar a api do Jira.   |

## 5. Docker Project

Para subir o projeto a partir do docker basta utilizar o arquivo `docker-project.yml` conforme exemplo:

```yaml
  projeto-api:
    image: registry.nexus.azi.srv.br/treinamento/templates/whensat-app:1.0.0-ALPHA
    env_file:
      - variables.env
  projeto-app:
    image: registry.nexus.azi.srv.br/treinamento/templates/whensat-app:1.0.0-ALPHA
    env_file:
      - variables.env
```

## 3. Configurações no Setup

A seguir descreveremos os parâmetros, atributos e modelos de documentos do Setup.

### 6.1 Parâmetros de Configuração

Os parâmetros e valores que podem apresentar, estão listados abaixo na tabela:

| Chave                                                  | Valor Padrão                 | Valores Possíveis    | Descrição                            |
|--------------------------------------------------------|------------------------------|----------------------|--------------------------------------|
| az.projeto.integration.jira.uri                        | https://aztecnologia.atlassian.net                  | Texto livre | Url base para acessar a api do Jira  |
| az.projeto.integration.jira.token                      | bGludXguYmluZEBhemkuY29tLmJyOnVnZHQzMmlKNEx0SWdWUXdwTjZMN0EyOA==                | Texto livre | Token para acessar a api do Jira.    |
| az.projeto.integration.sistema-de-controle-de-projetos | jira                         | Texto livre | Sistema de gerenciamento de projetos |
| az.projeto.feriados.1                                  | 01/01                        | outro feriado | Feriado                              |
| az.projeto.feriados.2                                  | 21/04                        | outro feriado | Feriado                              |
| az.projeto.feriados.3                                  | 01/05                        | outro feriado | Feriado                              |
| az.projeto.feriados.4                                  | 07/09                        | outro feriado | Feriado                              |
| az.projeto.feriados.5                                  | 02/11                        | outro feriado | Feriado                              |
| az.projeto.feriados.6                                  | 15/11                        | outro feriado | Feriado                              |
| az.projeto.feriados.7                                  | 25/12                        | outro feriado | Feriado                              |

