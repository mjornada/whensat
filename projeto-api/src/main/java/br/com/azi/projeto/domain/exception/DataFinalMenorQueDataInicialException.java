package br.com.azi.projeto.domain.exception;

public class DataFinalMenorQueDataInicialException extends RuntimeException{

    public DataFinalMenorQueDataInicialException() {
        super("A data final é menor que a data inicial!");
    }
}
