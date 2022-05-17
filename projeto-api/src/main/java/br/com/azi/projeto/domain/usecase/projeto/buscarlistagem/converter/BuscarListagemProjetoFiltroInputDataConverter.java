package br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.converter;

import br.com.azi.projeto.domain.commons.converter.GenericConverter;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.BuscarListagemProjetoInputData;
import lombok.Builder;

@Builder
public class BuscarListagemProjetoFiltroInputDataConverter extends GenericConverter<BuscarListagemProjetoInputData, Projeto.Filtro> {

    @Override
    public Projeto.Filtro to(BuscarListagemProjetoInputData buscarListagemProjetoInputData) {
        Projeto.Filtro filtro = super.to(buscarListagemProjetoInputData);
        filtro.setPage(filtro.getPage() - 1);

        return filtro;
    }

    @Override
    public BuscarListagemProjetoInputData from(Projeto.Filtro source) {
        throw new UnsupportedOperationException();
    }
}
