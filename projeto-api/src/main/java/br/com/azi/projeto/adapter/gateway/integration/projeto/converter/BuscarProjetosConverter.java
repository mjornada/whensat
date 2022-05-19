package br.com.azi.projeto.adapter.gateway.integration.projeto.converter;

import br.com.azi.projeto.adapter.gateway.integration.projeto.entity.BuscarProjetosResponse;
import br.com.azi.projeto.domain.commons.converter.GenericConverter;
import br.com.azi.projeto.domain.dto.ListaPaginadaDTO;
import br.com.azi.projeto.domain.dto.ProjetoDTO;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class BuscarProjetosConverter {

    private static final BuscarProjetosConverter.ItemOutputDataConverter itemOutputDataConverter = new BuscarProjetosConverter.ItemOutputDataConverter();

    public ListaPaginadaDTO<ProjetoDTO> converter(BuscarProjetosResponse origem) {
        return ListaPaginadaDTO.<ProjetoDTO>builder()
                .items(origem.getValues()
                        .stream()
                        .map(this::converterItem)
                        .collect(Collectors.toList()))
                .totalElements(origem.getTotal())
                .totalPages(origem.getStartAt())
                .build();
    }

    private ProjetoDTO converterItem(BuscarProjetosResponse.Item origem) {
        ProjetoDTO destino = itemOutputDataConverter.to(origem);

        destino.setId(origem.getId());
        destino.setNome(origem.getName());
        destino.setTipo(origem.getProjectTypeKey());

        return destino;
    }

    private static class ItemOutputDataConverter extends GenericConverter<BuscarProjetosResponse.Item, ProjetoDTO> {
    }
}
