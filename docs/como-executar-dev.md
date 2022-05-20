## Como executar em desenvolvimento 💻
Esse é um guia básico de como executar em desenvolvimento.


### Passo 1 - Configuração do ambiente
Para utilização dos sistemas da AZ Tecnologia em Gestão é necessário primeiro realizar a configuração local da máquina
para utilizar as ferramentas corporativas.

Um guia completo, sobre as configurações, pode ser encontrado [aqui](http://git.azi.com.br/hal/ambiente). É necessário que
seja feita a configuração até a instalação do **Hal-cli**.

```bash
npm i hal-cli -g
```


### Passo 2 - Subindo containers docker
Este comando irá subir todas as dependências como containers docker. Para isso ele deverá ser executado na pasta
raíz do repositório.

```bash
hal up --database mongo,postgresql
```


### Passo 3 - Instalando dependências do front
É recomendado utilizar o IntelliJ como IDE e instalar os plugins _VueJs_.

No diretório `projeto-app` contém dependências a serem instaladas, portanto execute o comando abaixo na raíz da pasta `projeto-app`.

```bash
npm install
```


### Passo 4 - Suba o back-end pela IDE
É recomendado utilizar o IntelliJ como IDE e instalar os plugins _Lombok_ .

Para subir a API, utilize a funcionalidade _Run Configurations_ do IntelliJ, presente em `Run > Edit Configurations`.
Na criação da _Run Configurations_ aponte para a classe principal do projeto `br.com.azi.projeto.ProjetoApiApplication`.

#### Variáveis de ambiente
Em seguida, copie as [variáveis de ambiente](../.variables-idea.env) para o seu _Run Configuration_ e execute a API do Projeto.


### Passo 5 - Acesse o projeto
Pronto, basta acessar: http://172.17.0.1/treinamento/

### Usuarios carga desenv

Em ambiente de desenvolvimento nós temos o usuário abaixo para teste:

#### Administrador
Como administrador você terá acesso completo ao Setup e ao Projeto, exemplo:

Login:
```bash
admin
```

Senha:
```bash
123
```