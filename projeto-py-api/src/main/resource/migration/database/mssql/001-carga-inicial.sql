CREATE TABLE public.tb_cliente
(
    cli_id int NOT NULL,
    cli_cpf_cnpj character varying(14) NOT NULL,
    cli_nome character varying(30) NOT NULL,
    cli_sobrenome character varying(50) NOT NULL,
    cli_data_nascimento date NOT NULL,
    cli_sexo "char" NOT NULL,
    PRIMARY KEY (cli_id)
);