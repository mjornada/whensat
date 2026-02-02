insert into comum.tb_produto (pr_id,pr_nome,pr_descricao,pr_titulo_img,pr_img_principal,pr_css_default,pl_id) values (311,'projeto','Projeto','','','default',1);

insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginTipo','INTERNO_EXTERNO',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginAreaInterno','Área do Servidor',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginChaveAcessoInterno','Usuário do Compras',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginFacebookInterno','false',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginEsqueceuSenhaInterno','true',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginAutoCadastroInterno','false',311);

insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginAreaExterno','Área do Fornecedor',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginChaveAcessoExterno','CPF ou Email',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginFacebookExterno','false',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginEsqueceuSenhaExterno','true',311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pr_id) values (comum.seq_produto_atributo.nextval,'loginAutoCadastroExterno','false',311);

insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pa_tipo, pr_id) values (comum.seq_produto_atributo.nextval, 'logo', 'repo1:projeto/logo.svg', 'ARQUIVO', 311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pa_tipo, pr_id) values (comum.seq_produto_atributo.nextval, 'logoEmail', 'repo1:projeto/logoEmail.png', 'ARQUIVO', 311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pa_tipo, pr_id) values (comum.seq_produto_atributo.nextval, 'logoMenu', 'repo1:projeto/logoMenu.svg', 'ARQUIVO', 311);
insert into comum.tb_produto_atributo (pa_id, pa_atributo, pa_valor, pa_tipo, pr_id) values (comum.seq_produto_atributo.nextval, 'logoMenuRetraido', 'repo1:projeto/logoMenuRetraido.svg', 'ARQUIVO', 311);