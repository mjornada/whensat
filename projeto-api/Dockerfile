FROM registry.nexus.azi.srv.br/hal/images/base-java11:latest

ENV APP_JAR=projeto-api.jar

COPY pom.xml .

RUN get-jarfile ./pom.xml $APP_JAR
