package br.com.azi.projeto.adapter.gateway.integration.projeto;

import br.com.azi.projeto.adapter.gateway.integration.projeto.usecase.BuscarProjetosJiraUseCase;
import br.com.azi.projeto.application.config.ProjetoProperties;
import br.com.azi.projeto.domain.dto.ListaPaginadaDTO;
import br.com.azi.projeto.domain.dto.ProjetoDTO;
import br.com.azi.projeto.domain.interfaces.integration.SistemaDeControleDeProjetosIntegration;
import lombok.Builder;

@Builder
public class SistemaDeControleDeProjetosJiraIntegrationImpl implements SistemaDeControleDeProjetosIntegration {

    private ProjetoProperties projetoProperties;
    private BuscarProjetosJiraUseCase buscarProjetosJiraUseCase;
    @Override
    public ListaPaginadaDTO<ProjetoDTO> buscar() {
        return buscarProjetosJiraUseCase.executar(projetoProperties);
    }
}
