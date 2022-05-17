package br.com.azi.projeto.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ListaPaginadaDTO<T> {
    private List<T> items;
    private Long totalPages;
    private Long totalElements;
}
