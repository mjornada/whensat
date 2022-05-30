package br.com.azi.projeto.domain.usecase.projeto.remover;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RemoverProjetoInputData {

    private Long id;
}
