package br.com.azi.projeto.adapter.entrypoint.controller.projeto;

import br.com.azi.projeto.domain.usecase.projeto.atualizar.AtualizarProjetoInputData;
import br.com.azi.projeto.domain.usecase.projeto.atualizar.AtualizarProjetoOutputData;
import br.com.azi.projeto.domain.usecase.projeto.atualizar.AtualizarProjetoUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@AllArgsConstructor
@RestController
@RequestMapping("/projetos/{id}")
public class AtualizarProjetoController {

    private AtualizarProjetoUseCase atualizarProjetoUseCase;

    @Transactional
    @PutMapping
    public ResponseEntity<Object> atualizar(@RequestBody AtualizarProjetoInputData inputData) {
        AtualizarProjetoOutputData outputData = atualizarProjetoUseCase.executar(inputData);
        return new ResponseEntity<>(outputData, HttpStatus.OK);
    }
}
