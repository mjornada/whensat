# Catalogador de Satélites: API de Predição Orbital

O **Catalogador** é uma solução de alta performance para o rastreamento e predição de passagens de satélites em tempo real. O sistema resolve o problema complexo de calcular a visibilidade de objetos que se deslocam a aproximadamente $7.5 \, km/s$ em órbita baixa da Terra (LEO), fornecendo aos usuários janelas precisas de observação baseadas em coordenadas geográficas.

## 🚀 O Desafio Técnico

Prever a passagem de um satélite exige mais do que cálculos geométricos simples. Este projeto aborda:

* **Propagação Orbital:** Tradução de dados **TLE (Two-Line Elements)** em vetores de estado (posição e velocidade) utilizando o modelo matemático SGP4.
* **Dinâmica de Dados:** Dados orbitais degradam-se rapidamente. O sistema implementa um fluxo de ingestão contínua para garantir que os cálculos utilizem os elementos mais recentes do *CelesTrak*.
* **Eficiência Computacional:** Cálculos de propagação são intensivos em CPU. A arquitetura utiliza uma camada estratégica de cache para minimizar a latência em requisições repetitivas.

## 🛠️ Stack Tecnológica & Padrões

O projeto foi construído seguindo os princípios de **Clean Architecture** e **Clean Code**, garantindo que a lógica de negócio (astrodinâmica) esteja isolada das infraestruturas (banco de dados e API).

* **Linguagem:** Python 3.10+
* **Framework Web:** FastAPI (Alta performance e documentação automática).
* **Cálculos Astronômicos:** Skyfield & sgp4.
* **Armazenamento:** PostgreSQL (Persistência e versionamento de TLEs).
* **Performance:** Redis (Cache layer para predições).

## 🏗️ Arquitetura

Em termos de implementação, o sistema é dividido em 2 grandes módulos/entregáveis:
- **whensat-api**: Responsável por fornecer a API REST tanto para o frontend quanto para aplicações externas.
- **whensat-app**: Frontend principal do sistema contendo as telas de manutenção e visualização.

A documentação detalhada da arquitetura do projeto pode ser acessada [aqui](docs/arquitetura.md).🏭


## License

This project is **not open source**.

The source code is publicly available for viewing purposes only.
All rights are reserved by the author.

Unauthorized use, modification, or redistribution of this code,
in whole or in part, is strictly prohibited.

See the [LICENSE](LICENSE) file for details.

-----

© Copyright 2026 - All rights reserved | Todos os direitos Reservados

__Maurício Jornada Bastos__