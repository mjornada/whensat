package br.com.azi.projeto.domain.usecase.projeto.remover;

import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.exception.ProjetoNaoEncontradoException;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.validation.Validator;
import lombok.Builder;

import java.util.Objects;

@Builder
public class RemoverProjetoUseCase {

    private ProjetoDataProvider projetoDataProvider;

    public void executar(RemoverProjetoInputData input) {
        validarDadosEntrada(input);
        validarProjetoExistente(input);

        projetoDataProvider.remover(input.getId());
    }

    private void validarDadosEntrada(RemoverProjetoInputData input) {
        Validator.of(input)
                .validate(RemoverProjetoInputData::getId, Objects::nonNull, "O id é nulo")
                .get();
    }

    private void validarProjetoExistente(RemoverProjetoInputData input) {
        Projeto projeto = projetoDataProvider.buscarPorId(input.getId());

        if (Objects.isNull(projeto)) {
            throw new ProjetoNaoEncontradoException(input.getId());
        }
    }
}
