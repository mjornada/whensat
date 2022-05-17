package br.com.azi.projeto.domain.usecase.projeto.buscarporid.converter;


import br.com.azi.projeto.domain.commons.converter.GenericConverter;
import br.com.azi.projeto.domain.commons.date.DateUtils;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.usecase.projeto.buscarporid.BuscarProjetoPorIdOutputData;
import lombok.Builder;

import java.util.Objects;

@Builder
public class BuscarProjetoPorIdOutputDataConverter extends GenericConverter<Projeto, BuscarProjetoPorIdOutputData> {

    @Override
    public BuscarProjetoPorIdOutputData to(Projeto source) {
        BuscarProjetoPorIdOutputData target = super.to(source);

        if (Objects.nonNull(source.getDataHoraInicial())) {
            target.setDataHoraInicial(DateUtils.formatarData(source.getDataHoraInicial()));
        }

        if (Objects.nonNull(source.getDataHoraFinal())) {
            target.setDataHoraFinal(DateUtils.formatarData(source.getDataHoraFinal()));
        }

        return target;
    }
}
