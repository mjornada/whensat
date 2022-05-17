package br.com.azi.projeto.domain.usecase.projeto.atualizar;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AtualizarProjetoInputData {
    private Long id;
    private String nome;
    private String descricao;
    private Date dataHoraInicial;
    private Date dataHoraFinal;
    private String situacao;
    private String categoria;
    private String uriLogo;
}
