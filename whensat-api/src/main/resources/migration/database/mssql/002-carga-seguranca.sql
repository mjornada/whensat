-- MODULOS E FUNCOES --

insert into comum.tb_modulo (mo_nome,mo_descricao,pr_id,mo_dthr_cadastro,mo_usuario_cadastro)
values ('PerfilSistema','Modulo de acesso as telas',311, CURRENT_TIMESTAMP,'Sistema');

insert into hal.tb_funcao (fu_nome,fu_descricao,mo_id,pl_id,fu_dthr_cadastro,fu_usuario_cadastro)
values ('PerfilSistema.Projeto','Função de acesso telas de projeto', IDENT_CURRENT ('COMUM.TB_MODULO'), 1, CURRENT_TIMESTAMP,'Sistema');
insert into hal.tb_funcao (fu_id,fu_nome,fu_descricao,mo_id,pl_id,fu_dthr_cadastro,fu_usuario_cadastro)
values ('PerfilSistema.Sistemas','Função de acesso telas de sistemas', IDENT_CURRENT ('COMUM.TB_MODULO'), 1, CURRENT_TIMESTAMP,'Sistema');

-- PERFIS --

-- ADMINSTRADOR --
insert into comum.tb_perfil(pf_nome,pf_descricao,pf_tipo,pr_id,pf_dthr_cadastro,pf_usuario_cadastro)
values ('Administrador','Administrador','INTERNO',311,current_timestamp(6),'Sistema');

insert into hal.tb_permissao_perfil(fu_id, pf_id, pl_id, pp_permissao)
values ((select fu_id from hal.tb_funcao where fu_nome like 'PerfilSistema.Projeto'),(select pf_id from comum.tb_perfil where pf_nome = 'Administrador' and pr_id = 311), 1,'S');

insert into hal.tb_permissao_perfil(fu_id, pf_id, pl_id, pp_permissao)
values ((select fu_id from hal.tb_funcao where fu_nome like 'PerfilSistema.Sistemas'),(select pf_id from comum.tb_perfil where pf_nome = 'Administrador' and pr_id = 311), 1,'S');