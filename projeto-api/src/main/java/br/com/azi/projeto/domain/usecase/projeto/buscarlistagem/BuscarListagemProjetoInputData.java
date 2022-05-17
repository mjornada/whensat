package br.com.azi.projeto.domain.usecase.projeto.buscarlistagem;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BuscarListagemProjetoInputData {
    private Long page;
    private Long rowsPerPage;
    private String sort;
    private String sortBy;
    private String nome;
}
