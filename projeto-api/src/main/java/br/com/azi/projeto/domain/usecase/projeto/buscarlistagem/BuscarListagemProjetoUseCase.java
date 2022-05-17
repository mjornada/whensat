package br.com.azi.projeto.domain.usecase.projeto.buscarlistagem;

import br.com.azi.projeto.domain.dto.ListaPaginadaDTO;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.converter.BuscarListagemProjetoFiltroInputDataConverter;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.converter.BuscarListagemProjetoOutputDataConverter;
import br.com.azi.projeto.domain.validation.Validator;
import lombok.Builder;

import java.util.Objects;
import java.util.stream.Collectors;

@Builder
public class BuscarListagemProjetoUseCase {

    private ProjetoDataProvider projetoDataProvider;
    private BuscarListagemProjetoFiltroInputDataConverter buscarListagemProjetoFiltroInputDataConverter;

    private BuscarListagemProjetoOutputDataConverter buscarListagemProjetoOutputDataConverter;

    public BuscarListagemProjetoOutputData executar(BuscarListagemProjetoInputData filtros) {
        validarDadosEntrada(filtros);

        Projeto.Filtro filtro = criarFiltro(filtros);
        ListaPaginadaDTO<Projeto> projetos = buscar(filtro);

        return converterItensParaOutputData(projetos);
    }

    private BuscarListagemProjetoOutputData converterItensParaOutputData(ListaPaginadaDTO<Projeto> projetos) {
        return BuscarListagemProjetoOutputData.builder()
                .itens(projetos.getItems()
                        .stream()
                        .map(buscarListagemProjetoOutputDataConverter::to)
                        .collect(Collectors.toList()))
                .totalPages(projetos.getTotalPages())
                .totalElements(projetos.getTotalElements())
                .build();
    }

    private void validarDadosEntrada(BuscarListagemProjetoInputData inputData) {
        Validator.of(inputData)
                .validate(BuscarListagemProjetoInputData::getRowsPerPage, rowsPerPage -> Objects.nonNull(rowsPerPage) && rowsPerPage > 0, "Ausência da quantidade de registros por página.")
                .validate(BuscarListagemProjetoInputData::getPage, Objects::nonNull, "Ausência do número da página.")
                .get();
    }

    private Projeto.Filtro criarFiltro(BuscarListagemProjetoInputData filtros) {
        return buscarListagemProjetoFiltroInputDataConverter.to(filtros);
    }

    private ListaPaginadaDTO<Projeto> buscar(Projeto.Filtro filtro) {
        return projetoDataProvider.buscarPorFiltro(filtro);
    }
}
