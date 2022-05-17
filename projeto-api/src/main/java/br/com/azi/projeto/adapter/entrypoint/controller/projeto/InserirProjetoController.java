package br.com.azi.projeto.adapter.entrypoint.controller.projeto;

import br.com.azi.projeto.domain.usecase.projeto.inserir.InserirProjetoInputData;
import br.com.azi.projeto.domain.usecase.projeto.inserir.InserirProjetoOutputData;
import br.com.azi.projeto.domain.usecase.projeto.inserir.InserirProjetoUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@AllArgsConstructor
@RestController
@RequestMapping("/projetos")
public class InserirProjetoController {

    private InserirProjetoUseCase inserirProjetoUseCase;

    @PostMapping
    public ResponseEntity<Object> inserir(@RequestBody InserirProjetoInputData inputData) {
        InserirProjetoOutputData outputData = inserirProjetoUseCase.executar(inputData);
        return new ResponseEntity<>(outputData, HttpStatus.CREATED);
    }
}
