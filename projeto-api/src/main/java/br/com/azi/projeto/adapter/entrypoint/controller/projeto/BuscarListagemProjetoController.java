package br.com.azi.projeto.adapter.entrypoint.controller.projeto;

import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.BuscarListagemProjetoInputData;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.BuscarListagemProjetoOutputData;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.BuscarListagemProjetoUseCase;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/projetos")
public class BuscarListagemProjetoController {

    private BuscarListagemProjetoUseCase useCase;

    @GetMapping
    public ResponseEntity<Object> bucarTodos(BuscarListagemProjetoInputData buscarListagemProjetoInputData) {
        BuscarListagemProjetoOutputData outputData = useCase.executar(buscarListagemProjetoInputData);
        return new ResponseEntity<>(outputData, HttpStatus.OK);
    }
}
