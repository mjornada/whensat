package br.com.azi.projeto.adapter.entrypoint.exceptionhandler;

import br.com.azi.projeto.domain.exception.ProjetoNaoEncontradoException;
import br.com.azi.projeto.domain.validation.BadRequestExceptionList;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GeneralExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({BadRequestExceptionList.class})
    public ResponseEntity<Object> handleBadRequestExceptionList(BadRequestExceptionList ex) {
        List<ErrorMessageArgs> response = ex.getExceptions().stream().map(e -> new ErrorMessageArgs(e.getClass().getName(), e.getMessage(), e.getArgs())).collect(Collectors.toList());
        return new ResponseEntity<>(new Encapsulator(response), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ProjetoNaoEncontradoException.class})
    public ResponseEntity<Object> handleNotFoundException(Exception e) {
        ErrorMessage response = new ErrorMessage(e.getClass().getName(), e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @Data
    @AllArgsConstructor
    static class ErrorMessage {
        String name;
        String message;
    }

    @Data
    @AllArgsConstructor
    static class ErrorMessageArgs {
        String name;
        String message;
        List<String> args;
    }

    @Data
    @AllArgsConstructor
    static class Encapsulator {
        List<ErrorMessageArgs> errorMessages;
    }
}
