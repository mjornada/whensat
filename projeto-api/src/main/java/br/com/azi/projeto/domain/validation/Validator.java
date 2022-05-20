package br.com.azi.projeto.domain.validation;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.Predicate;

public class Validator<T> {
    private final T t;
    private final List<Throwable> exceptions = new ArrayList<>();

    private Validator(T t) {
        this.t = t;
    }

    public static <T> Validator<T> of(T t) {
        return new Validator<>(Objects.requireNonNull(t));
    }

    public Validator<T> validate(Predicate<T> validation, String message) {
        if (!validation.test(t)) {
            exceptions.add(new IllegalStateException(message));
        }
        return this;
    }

    public Validator<T> validateWithBreakDown(Predicate<T> validation, Throwable throwable) {
        if (!validation.test(t)) {
            exceptions.add(throwable);
            throw new BadRequestExceptionList(exceptions);
        }
        return this;
    }

    public Validator<T> validateWithCustomException(Predicate<T> validation, Exception exception) {
        if (!validation.test(t)) {
            exceptions.add(exception);
        }
        return this;
    }

    public <U> Validator<T> validate(Function<T, U> projection, Predicate<U> validation, String message) {
        return validate(projection.andThen(validation::test)::apply, message);
    }

    public Validator<T> validate(Boolean assertion, Exception exception) {
        if(!assertion){
            exceptions.add(exception);
        }
        return this;
    }

    public T get() {
        if (ok()) {
            return t;
        }

        throw new BadRequestExceptionList(exceptions);
    }

    public void check() {
        if (!ok())
            throw new BadRequestExceptionList(exceptions);
    }

    public boolean ok() {
        return exceptions.isEmpty();
    }

    public <U> Validator<T> validate(Function<T, U> projection, Predicate<U> validation, Exception e) {
        return validateWithCustomException(projection.andThen(validation::test)::apply, e);
    }
}
