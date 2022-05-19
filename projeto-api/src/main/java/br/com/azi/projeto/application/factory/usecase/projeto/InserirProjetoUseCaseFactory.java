package br.com.azi.projeto.application.factory.usecase.projeto;

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
                                                             InserirProjetoOutputDataConverter inserirProjetoOutputDataConverter) {
        return InserirProjetoUseCase.builder()
                .projetoProperties(projetoProperties)
                .projetoDataProvider(projetoDataProvider)
                .inserirProjetoOutputDataConverter(inserirProjetoOutputDataConverter)
                .build();
    }

    @Bean
    public InserirProjetoOutputDataConverter createInserirProjetoOutputDataConverter() {
        return InserirProjetoOutputDataConverter.builder()
                .build();
    }
}
