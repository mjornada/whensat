package br.com.azi.projeto.adapter.entrypoint.controller.projeto;

import br.com.azi.projeto.domain.usecase.projeto.buscarporid.BuscarProjetoPorIdInputData;
import br.com.azi.projeto.domain.usecase.projeto.buscarporid.BuscarProjetoPorIdOutputData;
import br.com.azi.projeto.domain.usecase.projeto.buscarporid.BuscarProjetoPorIdUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/projetos/{id}")
@AllArgsConstructor
public class BuscarProjetoPorIdController {

    private BuscarProjetoPorIdUseCase buscarProjetoPorIdUseCase;

    @GetMapping
    public ResponseEntity<Object> buscar(BuscarProjetoPorIdInputData inputData) {
        BuscarProjetoPorIdOutputData outputData = buscarProjetoPorIdUseCase.executar(inputData);
        return new ResponseEntity<>(outputData, HttpStatus.OK);
    }
}