package br.com.azi.projeto.domain.interfaces.dataprovider;

import br.com.azi.projeto.domain.entity.Projeto;

public interface ProjetoDataProvider {

    Projeto buscarPorId(Long id);

    Projeto inserir(Projeto projeto);

    Projeto atualizar(Projeto projeto);
}
