package br.com.azi.projeto.application.factory.usecase.projeto;

import br.com.azi.projeto.domain.interfaces.integration.SistemaDeControleDeProjetosIntegration;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno.BuscarListagemProjetosSistemaExternoUseCase;
import br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno.converter.BuscarListagemProjetosSistemaExternoOutputDataConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BuscarListagemProjetosSistemaExternoFactory {

    @Bean
    public BuscarListagemProjetosSistemaExternoUseCase createBuscarListagemProjetoSistemaExternoUseCase(SistemaDeControleDeProjetosIntegration sistemaDeControleDeProjetosIntegration,
                                                                                                        BuscarListagemProjetosSistemaExternoOutputDataConverter buscarListagemProjetoSistemaExternoOutputDataConverter) {
        return BuscarListagemProjetosSistemaExternoUseCase.builder()
                .sistemaDeControleDeProjetosIntegration(sistemaDeControleDeProjetosIntegration)
                .buscarListagemProjetoSistemaExternoOutputDataConverter(buscarListagemProjetoSistemaExternoOutputDataConverter)
                .build();
    }

    @Bean
    public BuscarListagemProjetosSistemaExternoOutputDataConverter createBuscarListagemProjetoSistemaExternoOutputDataConverter() {
        return BuscarListagemProjetosSistemaExternoOutputDataConverter.builder()
                .build();
    }
}
