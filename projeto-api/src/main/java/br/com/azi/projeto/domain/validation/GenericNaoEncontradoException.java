package br.com.azi.projeto.domain.validation;

public class GenericNaoEncontradoException extends RuntimeException{

    public GenericNaoEncontradoException(String message) {
        super(message);
    }
}
