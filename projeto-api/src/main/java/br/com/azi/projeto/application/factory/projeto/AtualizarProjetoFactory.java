package br.com.azi.projeto.application.factory.projeto;

import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.atualizar.AtualizarProjetoUseCase;
import br.com.azi.projeto.domain.usecase.projeto.atualizar.converter.AtualizarProjetoOutputDataConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AtualizarProjetoFactory {

    @Bean
    public AtualizarProjetoUseCase createAtualizarProjetoUseCase(ProjetoDataProvider projetoDataProvider, AtualizarProjetoOutputDataConverter converter) {
        return AtualizarProjetoUseCase.builder().projetoDataProvider(projetoDataProvider).atualizarProjetoOutputDataConverter(converter).build();
    }

    @Bean
    public AtualizarProjetoOutputDataConverter createAtualizarProjetoOutputDataConverter() {
        return AtualizarProjetoOutputDataConverter
                .builder().build();
    }
}
