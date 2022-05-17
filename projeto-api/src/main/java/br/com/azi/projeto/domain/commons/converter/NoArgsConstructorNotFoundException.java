package br.com.azi.projeto.domain.commons.converter;

public class NoArgsConstructorNotFoundException extends RuntimeException {
    public NoArgsConstructorNotFoundException() {
        super("No arguments constructor é requerido.");
    }
}
