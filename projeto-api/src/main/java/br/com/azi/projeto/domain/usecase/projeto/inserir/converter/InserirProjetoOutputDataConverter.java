package br.com.azi.projeto.domain.usecase.projeto.inserir.converter;

import br.com.azi.projeto.domain.commons.converter.GenericConverter;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.usecase.projeto.inserir.InserirProjetoOutputData;
import lombok.Builder;

@Builder
public class InserirProjetoOutputDataConverter extends GenericConverter<Projeto, InserirProjetoOutputData> {
}
