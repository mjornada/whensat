package br.com.azi.projeto.application.factory.projeto;

import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.BuscarListagemProjetoUseCase;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.converter.BuscarListagemProjetoFiltroInputDataConverter;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagem.converter.BuscarListagemProjetoOutputDataConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BuscarListagemProjetoFactory {

    @Bean
    public BuscarListagemProjetoUseCase createBuscarListagemProjetoUseCase(ProjetoDataProvider projetoDataProvider,
                                                                           BuscarListagemProjetoFiltroInputDataConverter buscarListagemProjetoFiltroInputDataConverter,
                                                                           BuscarListagemProjetoOutputDataConverter buscarListagemProjetoOutputDataConverter) {
        return BuscarListagemProjetoUseCase.builder()
                .projetoDataProvider(projetoDataProvider)
                .buscarListagemProjetoFiltroInputDataConverter(buscarListagemProjetoFiltroInputDataConverter)
                .buscarListagemProjetoOutputDataConverter(buscarListagemProjetoOutputDataConverter)
                .build();
    }

    @Bean
    public BuscarListagemProjetoFiltroInputDataConverter createBuscarListagemProjetoFiltroInputDataConverter() {
        return BuscarListagemProjetoFiltroInputDataConverter.builder().build();
    }

    @Bean
    public BuscarListagemProjetoOutputDataConverter createBuscarListagemProjetoOutputDataConverter() {
        return BuscarListagemProjetoOutputDataConverter.builder().build();
    }
}
