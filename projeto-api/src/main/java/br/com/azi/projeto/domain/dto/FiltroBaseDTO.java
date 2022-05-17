package br.com.azi.projeto.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FiltroBaseDTO {
    Long page;
    Long rowsPerPage;
    String sort;
    String sortBy;
}

