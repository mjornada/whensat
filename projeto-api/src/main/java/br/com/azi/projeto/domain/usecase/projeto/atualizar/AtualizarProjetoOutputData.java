package br.com.azi.projeto.domain.usecase.projeto.atualizar;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AtualizarProjetoOutputData {
    private Long id;
    private String nome;
    private String descricao;
    private LocalDateTime dataHoraInicial;
    private LocalDateTime dataHoraFinal;
    private String situacao;
    private String categoria;
    private String uriLogo;
}
