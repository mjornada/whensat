package br.com.azi.projeto.domain.usecase.projeto.buscarporid;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BuscarProjetoPorIdOutputData {
    private Long id;
    private String nome;
    private String descricao;
    private String dataHoraInicial;
    private String dataHoraFinal;
    private String situacao;
    private String categoria;
    private String uriLogo;
}
