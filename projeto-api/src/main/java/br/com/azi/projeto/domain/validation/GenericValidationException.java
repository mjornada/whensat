package br.com.azi.projeto.domain.validation;

import lombok.Data;

import java.util.List;

@Data
public class GenericValidationException extends RuntimeException {
    List<String> args;

    public GenericValidationException(String message) {
        super(message);
    }

    public GenericValidationException(String message, List<String> args) {
        super(message);
        this.args = args;
    }

    public GenericValidationException(Throwable throwable) {
        super(throwable.getMessage() != null ? throwable.getMessage() : "", throwable);
    }
}
