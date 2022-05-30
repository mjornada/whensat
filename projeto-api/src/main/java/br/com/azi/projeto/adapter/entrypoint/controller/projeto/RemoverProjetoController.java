package br.com.azi.projeto.adapter.entrypoint.controller.projeto;

import br.com.azi.projeto.domain.usecase.projeto.remover.RemoverProjetoInputData;
import br.com.azi.projeto.domain.usecase.projeto.remover.RemoverProjetoUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

@AllArgsConstructor
@RestController
@RequestMapping("/projetos/{id}")
public class RemoverProjetoController {

    private RemoverProjetoUseCase removerProjetoUseCase;

    @Transactional
    @DeleteMapping
    public ResponseEntity<Void> remover(RemoverProjetoInputData input) {
        removerProjetoUseCase.executar(input);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
