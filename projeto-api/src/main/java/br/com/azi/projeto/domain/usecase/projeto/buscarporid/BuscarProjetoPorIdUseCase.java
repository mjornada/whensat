package br.com.azi.projeto.domain.usecase.projeto.buscarporid;

import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.exception.ProjetoNaoEncontradoException;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.buscarporid.converter.BuscarProjetoPorIdOutputDataConverter;
import br.com.azi.projeto.domain.validation.Validator;
import lombok.Builder;

import java.util.Objects;

@Builder
public class BuscarProjetoPorIdUseCase {

    private ProjetoDataProvider projetoDataProvider;

    private BuscarProjetoPorIdOutputDataConverter converter;

    public BuscarProjetoPorIdOutputData executar(BuscarProjetoPorIdInputData input) {
        validarDadosDeEntrada(input);
        Projeto projeto = buscar(input);

        return converter.to(projeto);
    }

    private Projeto buscar(BuscarProjetoPorIdInputData input) {
        Projeto projeto = projetoDataProvider.buscarPorId(input.getId());

        if (Objects.isNull(projeto))
            throw new ProjetoNaoEncontradoException(input.getId());

        return projeto;
    }

    private void validarDadosDeEntrada(BuscarProjetoPorIdInputData input) {
        Validator.of(input).validate(BuscarProjetoPorIdInputData::getId, Objects::nonNull, "O id é nulo").get();
    }
}
