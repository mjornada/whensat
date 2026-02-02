-- MODULOS E FUNCOES --

insert into comum.tb_modulo (mo_id,mo_nome,mo_descricao,pr_id,mo_dthr_cadastro,mo_usuario_cadastro)
values (COMUM.SEQ_MODULO.NEXTVAL,'PerfilSistema','Modulo de acesso as telas',311, current_timestamp(6),'Sistema');

insert into hal.tb_funcao (fu_id,fu_nome,fu_descricao,mo_id,pl_id,fu_dthr_cadastro,fu_usuario_cadastro)
values (HAL.SEQ_FUNCAO.NEXTVAL,'PerfilSistema.Projeto','Função de acesso telas de projeto', (SELECT MO_ID FROM COMUM.TB_MODULO WHERE MO_NOME = 'PerfilSistema' AND PR_ID = 311), 1, current_timestamp(6),'Sistema');
insert into hal.tb_funcao (fu_id,fu_nome,fu_descricao,mo_id,pl_id,fu_dthr_cadastro,fu_usuario_cadastro)
values (HAL.SEQ_FUNCAO.NEXTVAL,'PerfilSistema.Sistemas','Função de acesso telas de sistemas', (SELECT MO_ID FROM COMUM.TB_MODULO WHERE MO_NOME = 'PerfilSistema' AND PR_ID = 311), 1, current_timestamp(6),'Sistema');

-- PERFIS --

-- ADMINSTRADOR --
insert into comum.tb_perfil(pf_id,pf_nome,pf_descricao,pf_tipo,pr_id,pf_dthr_cadastro,pf_usuario_cadastro)
values (COMUM.SEQ_PERFIL.NEXTVAL,'Administrador','Administrador','INTERNO',311,current_timestamp(6),'Sistema');

insert into hal.tb_permissao_perfil(fu_id, pf_id, pl_id, pp_permissao)
values ((select fu_id from hal.tb_funcao where fu_nome like 'PerfilSistema.Projeto'),(select pf_id from comum.tb_perfil where pf_nome = 'Administrador' and pr_id = 311), 1,'S');

insert into hal.tb_permissao_perfil(fu_id, pf_id, pl_id, pp_permissao)
values ((select fu_id from hal.tb_funcao where fu_nome like 'PerfilSistema.Sistemas'),(select pf_id from comum.tb_perfil where pf_nome = 'Administrador' and pr_id = 311), 1,'S');
