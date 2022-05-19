package br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno;

import br.com.azi.projeto.domain.dto.ListaPaginadaDTO;
import br.com.azi.projeto.domain.dto.ProjetoDTO;
import br.com.azi.projeto.domain.interfaces.integration.SistemaDeControleDeProjetosIntegration;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno.converter.BuscarListagemProjetosSistemaExternoOutputDataConverter;
import lombok.Builder;

import java.util.stream.Collectors;

@Builder
public class BuscarListagemProjetosSistemaExternoUseCase {

    private SistemaDeControleDeProjetosIntegration sistemaDeControleDeProjetosIntegration;

    private BuscarListagemProjetosSistemaExternoOutputDataConverter buscarListagemProjetoSistemaExternoOutputDataConverter;

    public BuscarListagemProjetosSistemaExternoOutputData executar() {
        ListaPaginadaDTO<ProjetoDTO> projetosEncontrados = buscar();
        return converterItensParaOutputData(projetosEncontrados);
    }

    private ListaPaginadaDTO<ProjetoDTO> buscar() {
        return sistemaDeControleDeProjetosIntegration.buscar();
    }

    private BuscarListagemProjetosSistemaExternoOutputData converterItensParaOutputData(ListaPaginadaDTO<ProjetoDTO> projetos) {
        BuscarListagemProjetosSistemaExternoOutputData outputData = new BuscarListagemProjetosSistemaExternoOutputData();
        outputData.itens = projetos
                .getItems()
                .stream()
                .map(buscarListagemProjetoSistemaExternoOutputDataConverter::to)
                .collect(Collectors.toList());
        outputData.setTotalPages(projetos.getTotalPages());
        outputData.setTotalElements(projetos.getTotalElements());

        return outputData;
    }

}
