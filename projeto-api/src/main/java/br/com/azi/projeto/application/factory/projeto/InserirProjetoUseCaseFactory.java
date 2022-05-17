package br.com.azi.projeto.application.factory.projeto;

import br.com.azi.projeto.application.config.ProjetoProperties;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.inserir.InserirProjetoUseCase;
import br.com.azi.projeto.domain.usecase.projeto.inserir.converter.InserirProjetoOutputDataConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InserirProjetoUseCaseFactory {

    @Bean
    public InserirProjetoUseCase createInserirProjetoUseCase(ProjetoProperties projetoProperties,
                                                             ProjetoDataProvider projetoDataProvider,
                                                             InserirProjetoOutputDataConverter converter) {
        return InserirProjetoUseCase.builder()
                .projetoProperties(projetoProperties)
                .projetoDataProvider(projetoDataProvider)
                .inserirProjetoOutputDataConverter(converter)
                .build();
    }

    @Bean
    public InserirProjetoOutputDataConverter createInserirProjetoOutputDataConverter() {
        return InserirProjetoOutputDataConverter.builder()
                .build();
    }
}
