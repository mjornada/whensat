## Projeto de exemplo para estrutura base dos projetos da AZ

Esta aplicação é um exemplo de como funciona a arquitetura de projetos na AZ. Um exemplo de projeto, utilizando o Vue.js no front-end e Spring no back-end.

## Arquitetura
???

## Como implantar
???

## Como desenvolver

#### PASSO 1 - Instale o hal-cli globalmente
Este programa irá prover comandos que te ajudará a subir parte dentro do docker e parte fora.

```bash
npm i hal-cli -g
```

#### PASSO 2 - Execute o comando abaixo na pasta raiz do repositório
Este comando irá subir todas as depenências do docker que esta aplicação depente para ser executado.

```bash
hal up --database mongo,postgresql
```

#### PASSO 3 - Suba a Api pela IDE
Para subir a API, utilize a funcionalidade *Run Configurations* do IntelliJ.
Na criação da Run Configuration aponte para a classe principal do projeto `projeto-api-application`.
Em seguida, copie as variáveis do arquivo [.variables-idea.env](.variables-idea.env).

#### PASSO 4 - Suba o frontend pela IDE
Basta entrar na subpasta do projeto frontend e executar o comando `npm run serve`.

#### PASSO 5 - Acesse o projeto
Pronto, basta acessar: http://172.17.0.1/treinamento/

## Usuarios carga desenv

Em ambiente de desenvolvimento nós temos o usuário abaixo para teste:


### Administrador
Como administrador você terá acesso completo ao Setup e ao Projeto, exemplo:

Login:
```bash
admin
```

Senha:
```bash
123
```

-----

© Copyright 2022 - All rights reserved | Todos os direitos Reservados

__AZ Tecnologia em Gestão__
