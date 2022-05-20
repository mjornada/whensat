package br.com.azi.projeto.domain.validation;

import lombok.Data;
import org.apache.commons.collections.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Data
public class BadRequestExceptionList extends RuntimeException {
    private final List<GenericValidationException> exceptions;

    public BadRequestExceptionList(String message, List<GenericValidationException> exceptions) {
        super(message);
        this.exceptions = exceptions;
    }

    public BadRequestExceptionList(List<Throwable> throwables) {
        super("");
        this.exceptions = new ArrayList<>();

        if (CollectionUtils.isNotEmpty(throwables)) {
            throwables.forEach(throwable -> this.exceptions.add(new GenericValidationException(throwable)));
        }
    }
}
