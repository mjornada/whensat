-- Sequences
create sequence projeto.seq_projeto
    start with 1
    increment by 1
    no minvalue
    no maxvalue
    cache 1;

--Tables
--Comments

create table projeto.tb_projeto (
    pr_id bigint primary key,
    pr_nome character varying(100),
    pr_descricao character varying(500),
    pr_dthr_inicial timestamp(6),
    pr_dthr_final timestamp(6),
    pr_situacao character varying(20),
    pr_categoria character varying(20),
    pr_uri_logo character varying(100),
    pr_dthr_cadastro timestamp(6),
    pr_dthr_alteracao timestamp(6),
    pr_usuario_cadastro character varying(255),
    pr_usuario_alteracao character varying(255)
);

COMMENT ON TABLE projeto.tb_projeto IS 'Tabela onde são registradas os clientes.';
COMMENT ON COLUMN projeto.tb_projeto.pr_id IS 'Chave primária da tabela.';
COMMENT ON COLUMN projeto.tb_projeto.pr_nome IS 'Nome do projeto.';
COMMENT ON COLUMN projeto.tb_projeto.pr_descricao IS 'Descrição do projeto.';
COMMENT ON COLUMN projeto.tb_projeto.pr_dthr_inicial IS 'Data/Hora inicial do projeto.';
COMMENT ON COLUMN projeto.tb_projeto.pr_dthr_final IS 'Data/Hora final do projeto.';
COMMENT ON COLUMN projeto.tb_projeto.pr_situacao IS 'Situação do projeto.';
COMMENT ON COLUMN projeto.tb_projeto.pr_categoria IS 'Categoria do projeto.';
COMMENT ON COLUMN projeto.tb_projeto.pr_uri_logo IS 'Uri da logo do projeto.';
COMMENT ON COLUMN projeto.tb_projeto.pr_dthr_cadastro IS 'Data/Hora de criação do registro.';
COMMENT ON COLUMN projeto.tb_projeto.pr_dthr_alteracao IS 'Data/Hora da última alteração do registro.';
COMMENT ON COLUMN projeto.tb_projeto.pr_usuario_cadastro IS 'Usuário que criou o registro.';
COMMENT ON COLUMN projeto.tb_projeto.pr_usuario_alteracao IS 'Último usuário a alterar o registro.';

-- Indexes

CREATE INDEX idx_pr_pr_nome ON projeto.tb_projeto (pr_nome);