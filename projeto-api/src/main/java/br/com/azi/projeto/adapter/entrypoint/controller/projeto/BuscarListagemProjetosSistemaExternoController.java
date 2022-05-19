package br.com.azi.projeto.adapter.entrypoint.controller.projeto;

import br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno.BuscarListagemProjetosSistemaExternoOutputData;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno.BuscarListagemProjetosSistemaExternoUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/projetos/sistema-externo")
public class BuscarListagemProjetosSistemaExternoController {

    private BuscarListagemProjetosSistemaExternoUseCase buscarListagemProjetosSistemaExternoUseCase;

    @GetMapping
    public ResponseEntity<Object> buscarTodos() {
        BuscarListagemProjetosSistemaExternoOutputData outputData = buscarListagemProjetosSistemaExternoUseCase.executar();
        return new ResponseEntity<>(outputData, HttpStatus.OK);
    }
}
