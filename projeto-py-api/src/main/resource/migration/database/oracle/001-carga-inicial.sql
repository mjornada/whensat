CREATE TABLE tb_cliente
(
    cli_id number GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    cli_cpf_cnpj varchar2(14) NOT NULL,
    cli_nome varchar2(30) NOT NULL,
    cli_sobrenome varchar2(50) NOT NULL,
    cli_data_nascimento date NOT NULL,
    cli_sexo "char" NOT NULL,
    PRIMARY KEY (cli_id)
);
