package br.com.azi.projeto.adapter.gateway.dataprovider.converter;

import br.com.azi.projeto.domain.dto.FiltroBaseDTO;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Objects;

public class FiltroConverter {

    private FiltroConverter() {
        throw new IllegalStateException("Classe Utilitária");
    }

    public static Pageable extrairPaginacao(FiltroBaseDTO filtro) {
        return PageRequest.of(filtro.getPage().intValue(),
                filtro.getRowsPerPage().intValue(),
                Sort.by(Sort.Direction.valueOf(Objects.nonNull(filtro.getSort()) ? filtro.getSort() : "ASC"),
                        Objects.nonNull(filtro.getSortBy()) ? filtro.getSortBy() : "id"));
    }
}
