package br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno.converter;

import br.com.azi.projeto.domain.commons.converter.GenericConverter;
import br.com.azi.projeto.domain.dto.ProjetoDTO;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno.BuscarListagemProjetosSistemaExternoOutputData;
import lombok.Builder;

@Builder
public class BuscarListagemProjetosSistemaExternoOutputDataConverter extends GenericConverter<ProjetoDTO, BuscarListagemProjetosSistemaExternoOutputData.Item> {

    @Override
    public BuscarListagemProjetosSistemaExternoOutputData.Item to(ProjetoDTO source) {
        return super.to(source);
    }
}
