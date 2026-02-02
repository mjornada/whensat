FROM python:3.10-slim

WORKDIR /app

# Instalar dependências do sistema necessárias para psycopg2 e Java (para Liquibase)
RUN apt-get update && apt-get install -y \
    gcc \
    python3-dev \
    libpq-dev \
    default-jre \
    && rm -rf /var/lib/apt/lists/*

COPY whensat-api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# O código espera estar em src/main/python para rodar aplicationApi.py
WORKDIR /app/whensat-api/src/main/python

# Variáveis de ambiente padrão
ENV PYTHONPATH=/app/whensat-api/src/main/python
ENV DATABASE_URL=jdbc:postgresql://db:5432/ws
ENV DATABASE_USER=postgres
ENV DATABASE_PASSWORD=postgres

EXPOSE 4444

CMD ["python", "aplicationApi.py"]
