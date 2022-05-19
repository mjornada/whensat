package br.com.azi.projeto.application.factory.integration;

import br.com.azi.projeto.adapter.gateway.integration.projeto.SistemaDeControleDeProjetosJiraIntegrationImpl;
import br.com.azi.projeto.adapter.gateway.integration.projeto.usecase.BuscarProjetosJiraUseCase;
import br.com.azi.projeto.application.config.ProjetoProperties;
import br.com.azi.projeto.domain.interfaces.integration.SistemaDeControleDeProjetosIntegration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@RefreshScope
@Configuration
@ConditionalOnProperty(prefix = "az.projeto.integration", name = "sistema-de-controle-de-projetos", havingValue = "jira", matchIfMissing = true)
public class SistemaDeControleDeProjetosJiraIntegrationConfiguration {

    @Bean
    @Primary
    public SistemaDeControleDeProjetosIntegration createSistemaDeControleDeProjetosJiraIntegration(ProjetoProperties projetoProperties,
                                                                                                   BuscarProjetosJiraUseCase buscarProjetosJiraUseCase) {
        return SistemaDeControleDeProjetosJiraIntegrationImpl.builder()
                .projetoProperties(projetoProperties)
                .buscarProjetosJiraUseCase(buscarProjetosJiraUseCase)
                .build();
    }
}
