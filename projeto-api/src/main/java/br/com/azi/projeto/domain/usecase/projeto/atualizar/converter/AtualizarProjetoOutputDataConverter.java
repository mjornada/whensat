package br.com.azi.projeto.domain.usecase.projeto.atualizar.converter;

import br.com.azi.projeto.domain.commons.converter.GenericConverter;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.usecase.projeto.atualizar.AtualizarProjetoOutputData;
import lombok.Builder;

@Builder
public class AtualizarProjetoOutputDataConverter extends GenericConverter<Projeto, AtualizarProjetoOutputData> {
}
