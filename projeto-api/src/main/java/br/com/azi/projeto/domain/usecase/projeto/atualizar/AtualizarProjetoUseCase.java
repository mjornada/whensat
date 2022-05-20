package br.com.azi.projeto.domain.usecase.projeto.atualizar;

import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.exception.ProjetoNaoEncontradoException;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.atualizar.converter.AtualizarProjetoOutputDataConverter;
import br.com.azi.projeto.domain.validation.Validator;
import lombok.Builder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;

@Builder
public class AtualizarProjetoUseCase {

    private ProjetoDataProvider projetoDataProvider;

    private AtualizarProjetoOutputDataConverter atualizarProjetoOutputDataConverter;

    public AtualizarProjetoOutputData executar(AtualizarProjetoInputData input) {
        validarDadosEntrada(input);
        Projeto projeto = buscar(input);
        setarValores(projeto, input);
        Projeto projetoSalvo = salvar(projeto);

        return atualizarProjetoOutputDataConverter.to(projetoSalvo);
    }

    private void validarDadosEntrada(AtualizarProjetoInputData input) {
        Validator.of(input)
                .validate(AtualizarProjetoInputData::getId, Objects::nonNull, "O id é nulo")
                .validate(AtualizarProjetoInputData::getNome, Objects::nonNull, "O campo nome é nulo")
                .validate(AtualizarProjetoInputData::getDataHoraInicial, Objects::nonNull, "O campo data inicial é nulo")
                .validate(AtualizarProjetoInputData::getDataHoraFinal, Objects::nonNull, "O campo data final é nulo")
                .validate(AtualizarProjetoInputData::getSituacao, Objects::nonNull, "O campo situação é nulo")
                .validate(AtualizarProjetoInputData::getCategoria, Objects::nonNull, "O campo categoria é nulo")
                .get();
    }

    private Projeto buscar(AtualizarProjetoInputData input) {
        Projeto projeto = projetoDataProvider.buscarPorId(input.getId());

        if (Objects.isNull(projeto))
            throw new ProjetoNaoEncontradoException(input.getId());

        return projeto;
    }

    private void setarValores(Projeto projeto, AtualizarProjetoInputData input) {
        projeto.setNome(input.getNome());
        projeto.setDescricao(input.getDescricao());
        projeto.setDataHoraInicial(LocalDateTime.ofInstant(input.getDataHoraInicial().toInstant(), ZoneId.systemDefault()));
        projeto.setDataHoraFinal(LocalDateTime.ofInstant(input.getDataHoraFinal().toInstant(), ZoneId.systemDefault()));
        projeto.setSituacao(Projeto.Situacao.valueOf(input.getSituacao()));
        projeto.setCategoria(Projeto.Categoria.valueOf(input.getCategoria()));
    }

    private Projeto salvar(Projeto projeto) {
        return projetoDataProvider.atualizar(projeto);
    }
}
