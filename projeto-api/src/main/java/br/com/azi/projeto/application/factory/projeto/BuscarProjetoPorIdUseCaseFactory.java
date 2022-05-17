package br.com.azi.projeto.application.factory.projeto;

import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.buscarporid.BuscarProjetoPorIdUseCase;
import br.com.azi.projeto.domain.usecase.projeto.buscarporid.converter.BuscarProjetoPorIdOutputDataConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BuscarProjetoPorIdUseCaseFactory {

    @Bean
    public BuscarProjetoPorIdUseCase createBuscarProjetoPorIdUseCase(ProjetoDataProvider projetoDataProvider, BuscarProjetoPorIdOutputDataConverter buscarProjetoPorIdOutputDataConverter) {
        return BuscarProjetoPorIdUseCase.builder()
                .projetoDataProvider(projetoDataProvider)
                .converter(buscarProjetoPorIdOutputDataConverter)
                .build();
    }

    @Bean
    public BuscarProjetoPorIdOutputDataConverter createBuscarProjetoPorIdOutputDataConverter() {
        return BuscarProjetoPorIdOutputDataConverter.builder()
                .build();
    }
}
