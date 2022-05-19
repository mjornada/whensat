package br.com.azi.projeto.domain.interfaces.integration;

import br.com.azi.projeto.domain.dto.ListaPaginadaDTO;
import br.com.azi.projeto.domain.dto.ProjetoDTO;

public interface SistemaDeControleDeProjetosIntegration {

    ListaPaginadaDTO<ProjetoDTO> buscar();
}
