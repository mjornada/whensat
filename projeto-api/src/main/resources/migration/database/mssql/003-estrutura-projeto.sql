-- Sequences
CREATE SEQUENCE PROJETO.SEQ_PROJETO AS BIGINT
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Tables
-- Comments

CREATE TABLE PROJETO.TB_PROJETO (
    PR_ID INT PRIMARY KEY,
    PR_NOME VARCHAR(100),
    PR_DESCRICAO VARCHAR(500),
    PR_DTHR_INICIAL DATETIME2(6) NULL,
    PR_DTHR_FINAL DATETIME2(6) NULL,
    PR_SITUACAO VARCHAR(20),
    PR_CATEGORIA VARCHAR(20),
    PR_URI_LOGO VARCHAR(100),
    PR_DTHR_CADASTRO DATETIME2(6) NULL,
    PR_DTHR_ALTERACAO DATETIME2(6) NULL,
    PR_USUARIO_CADASTRO VARCHAR(255) NULL,
    PR_USUARIO_ALTERACAO VARCHAR(255) NULL
);

EXECUTE sp_addextendedproperty 'MS_Description', 'Tabela onde são registradas os clientes.', 'SCHEMA', 'projeto', 'TABLE', 'tb_projeto', NULL, NULL;
EXECUTE sp_addextendedproperty 'MS_Description', 'Chave primária da tabela.', 'SCHEMA', 'projeto', 'table', 'tb_projeto', 'column', 'pr_id';
EXECUTE sp_addextendedproperty 'MS_Description', 'Nome do projeto.', 'SCHEMA', 'projeto', 'table', 'tb_projeto', 'column', 'pr_nome';
EXECUTE sp_addextendedproperty 'MS_Description', 'Descrição do projeto.', 'SCHEMA', 'projeto', 'table', 'tb_projeto', 'column', 'pr_descricao';
EXECUTE sp_addextendedproperty 'MS_Description', 'Data/Hora inicial do projeto.', 'SCHEMA', 'projeto', 'table', 'tb_projeto', 'column', 'pr_dthr_inicial';
EXECUTE sp_addextendedproperty 'MS_Description', 'Data/Hora final do projeto.', 'SCHEMA', 'projeto', 'table', 'tb_projeto', 'column', 'pr_dthr_final';
EXECUTE sp_addextendedproperty 'MS_Description', 'Situação do projeto.', 'SCHEMA', 'projeto', 'table', 'tb_projeto', 'column', 'pr_situacao';
EXECUTE sp_addextendedproperty 'MS_Description', 'Categoria do projeto.', 'SCHEMA', 'projeto', 'table', 'tb_projeto', 'column', 'pr_categoria';
EXECUTE sp_addextendedproperty 'MS_Description', 'Uri da logo do projeto.', 'SCHEMA', 'projeto', 'table', 'tb_projeto', 'column', 'pr_uri_logo';
EXECUTE sp_addextendedproperty 'MS_Description', 'Data/Hora de criação do registro.', 'SCHEMA', 'projeto', 'TABLE', 'tb_projeto', 'column', 'pr_dthr_cadastro';
EXECUTE sp_addextendedproperty 'MS_Description', 'Data/Hora da última alteração do registro.', 'SCHEMA', 'projeto', 'TABLE', 'tb_projeto', 'column', 'pr_dthr_alteracao';
EXECUTE sp_addextendedproperty 'MS_Description', 'Usuário que criou o registro.', 'SCHEMA', 'projeto', 'TABLE', 'tb_projeto', 'column', 'pr_usuario_cadastro';
EXECUTE sp_addextendedproperty 'MS_Description', 'Último usuário a alterar o registro.', 'SCHEMA', 'projeto', 'TABLE', 'tb_projeto', 'column', 'pr_usuario_alteracao';

-- Indexes

CREATE INDEX IDX_PR_PR_NOME ON PROJETO.TB_PROJETO (PR_NOME);
