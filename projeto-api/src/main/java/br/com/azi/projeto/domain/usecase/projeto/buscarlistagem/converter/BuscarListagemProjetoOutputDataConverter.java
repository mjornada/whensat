package br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.converter;

import br.com.azi.projeto.domain.commons.converter.GenericConverter;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.BuscarListagemProjetoOutputData;
import lombok.Builder;

@Builder
public class BuscarListagemProjetoOutputDataConverter extends GenericConverter<Projeto, BuscarListagemProjetoOutputData.Item> {
    @Override
    public BuscarListagemProjetoOutputData.Item to(Projeto projeto) {
        return super.to(projeto);
    }

    @Override
    public Projeto from(BuscarListagemProjetoOutputData.Item source) {
        throw new UnsupportedOperationException();
    }
}
