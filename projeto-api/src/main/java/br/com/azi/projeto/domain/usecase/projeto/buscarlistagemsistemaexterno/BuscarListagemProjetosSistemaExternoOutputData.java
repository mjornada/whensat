package br.com.azi.projeto.domain.usecase.projeto.buscarlistagemsistemaexterno;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class BuscarListagemProjetosSistemaExternoOutputData {

    List<Item> itens;
    Long totalPages;
    Long totalElements;

    @Data
    @NoArgsConstructor
    public static class Item {
        private Long id;
        private String nome;
        private String tipo;
    }
}
