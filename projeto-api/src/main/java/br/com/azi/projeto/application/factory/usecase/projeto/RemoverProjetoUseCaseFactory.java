package br.com.azi.projeto.application.factory.usecase.projeto;

import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.remover.RemoverProjetoUseCase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RemoverProjetoUseCaseFactory {

    @Bean
    public RemoverProjetoUseCase createRemoverProjetoUseCase(ProjetoDataProvider projetoDataProvider) {
        return RemoverProjetoUseCase.builder()
                .projetoDataProvider(projetoDataProvider)
                .build();
    }
}
