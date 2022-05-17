package br.com.azi.projeto.domain.exception;

public class ProjetoNaoEncontradoException extends RuntimeException {

    public ProjetoNaoEncontradoException(Long projetoId) {
        super(String.format("Projeto com id %s não foi Encontrado!", projetoId));
    }
}
