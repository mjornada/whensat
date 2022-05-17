package br.com.azi.projeto.domain.exception;

public class DataInicialNaoEDiaUtilException extends RuntimeException {
    public DataInicialNaoEDiaUtilException() {
        super("A data inicial não é um dia útil!");
    }
}
