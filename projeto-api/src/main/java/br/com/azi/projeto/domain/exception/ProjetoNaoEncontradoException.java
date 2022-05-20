package br.com.azi.projeto.domain.exception;

import br.com.azi.projeto.domain.validation.GenericNaoEncontradoException;

public class ProjetoNaoEncontradoException extends GenericNaoEncontradoException {

    public ProjetoNaoEncontradoException(Long projetoId) {
        super(String.format("Projeto com id %s não foi Encontrado!", projetoId));
    }
}
