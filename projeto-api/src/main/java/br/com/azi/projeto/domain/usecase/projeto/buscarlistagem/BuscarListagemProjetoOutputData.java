package br.com.azi.projeto.domain.usecase.projeto.buscarlistagem;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuscarListagemProjetoOutputData {

    List<Item> itens;
    Long totalPages;
    Long totalElements;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Item {
        private Long id;
        private String nome;
        private String descricao;
        private LocalDateTime dataHoraInicial;
        private LocalDateTime dataHoraFinal;
        private String situacao;
        private String categoria;
        private String uriLogo;
    }
}
