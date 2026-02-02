insert into comum.tb_produto (pr_id,pr_nome,pr_descricao,pr_titulo_img,pr_img_principal,pr_css_default,pl_id) values (311,'projeto','Projeto','','','default',1);

insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginTipo','INTERNO_EXTERNO',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginAreaInterno','Área do Servidor',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginChaveAcessoInterno','Usuário do Compras',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginFacebookInterno','false',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginEsqueceuSenhaInterno','true',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginAutoCadastroInterno','false',311);

insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginAreaExterno','Área do Fornecedor',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginChaveAcessoExterno','CPF ou Email',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginFacebookExterno','false',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginEsqueceuSenhaExterno','true',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (nextval('comum.seq_produto_atributo'),'loginAutoCadastroExterno','true',311);

insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pa_tipo, pr_id) values (nextval('comum.seq_produto_atributo'), 'logo', 'repo1:projeto/logo.svg', 'ARQUIVO', 311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pa_tipo, pr_id) values (nextval('comum.seq_produto_atributo'), 'logoEmail', 'repo1:projeto/logoEmail.png', 'ARQUIVO', 311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pa_tipo, pr_id) values (nextval('comum.seq_produto_atributo'), 'logoMenu', 'repo1:projeto/logoMenu.svg', 'ARQUIVO', 311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pa_tipo, pr_id) values (nextval('comum.seq_produto_atributo'), 'logoMenuRetraido', 'repo1:projeto/logoMenuRetraido.svg', 'ARQUIVO', 311);