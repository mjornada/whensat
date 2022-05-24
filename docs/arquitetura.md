## Arquitetura
Em termos de implementação, o projeto é dividido em 2 grandes módulos/entregáveis:
- __projeto-api__: responsável por fornecer sua API Rest tanto para o seu próprio frontend quanto para aplicações externas.
- __projeto-app__: frontend principal deste sistema contendo as principais telas de manutenção.

### Organização dos pacotes
```bash
src
└── br.com.azi.projeto
    └── adapter
        └── entrypoint
            └── controller
                └── exceptionhandler
            └── job
            └── queue        (Listener das filas)       
            ...                    
        └── gateway
            └── dataprovider (comunicação com o banco de dados)
            └── integration  (comunicação com serviços de api)
            └── queue        (Disparo para as filas)     
    └── application
        └── config
        └── factory                   
    └── domain
        └── commons
        └── dto    
        └── entity
        └── exception
        └── interfaces
        └── usecase                      
```

#### Entrypoint

Semelhante a camada de interface do C.A. Esta é a camada **REST** da aplicação.

Responsabilidades:

* Implementar os controllers.
* Implementar o tratamento global de exceções da aplicação.
* Implementar Jobs e listeners de fila.


#### Gateway

Da mesma forma que a camada Entrypoint é reponsável por se comunicar com a aplicação de UI, o Gateway é responsável por prover a comunicação da API com o banco de dados e API's de terceiros.

Responsabilidades:

* Implementar os DataProviders utilizando as interfaces da camada de domínio.
* Implementar a comunicação com o banco de dados.
* Implementar a comunicação com outros sistemas.
* Implementar os disparos para as fila.


#### Application
A Camada de application é responsável pela configuração e injeção de dependência da aplicação.

Responsabilidades:

* Realizar a injeção de dependências através das factories.
* Arquivos de configuração de tecnologias que venham ser utilizadas na aplicação.
* Parâmetros de sistema.


#### Domain

Camada de negócio da aplicação.

Responsabilidades:

* Conter a regra de negócio do projeto.
* Implementar os casos de uso.
* Implementar as entidades.
* Implementar o mapeamento objeto-relacional.
* Criar **apenas as interfaces** dos DataProviders.
