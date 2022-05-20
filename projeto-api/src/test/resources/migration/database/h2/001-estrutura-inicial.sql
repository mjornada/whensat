-- Sequences
create sequence projeto.seq_projeto;

CREATE TABLE projeto.tb_projeto (
    pr_id bigint PRIMARY KEY,
    pr_nome varchar(100),
    pr_descricao varchar(500),
    pr_dthr_inicial timestamp(6),
    pr_dthr_final timestamp(6),
    pr_situacao varchar(20),
    pr_categoria varchar(20),
    pr_dthr_cadastro timestamp(6),
    pr_dthr_alteracao timestamp(6),
    pr_usuario_cadastro varchar(255),
    pr_usuario_alteracao varchar(255)
);