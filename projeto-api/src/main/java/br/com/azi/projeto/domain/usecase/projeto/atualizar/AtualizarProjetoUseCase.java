package br.com.azi.projeto.domain.usecase.projeto.atualizar;

import br.com.azi.projeto.domain.constant.projeto.EnumCategoria;
import br.com.azi.projeto.domain.constant.projeto.EnumSituacao;
import br.com.azi.projeto.domain.entity.Projeto;
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

    public AtualizarProjetoOutputData executar(AtualizarProjetoInputData inputData) {
        validarDadosEntrada(inputData);
        Projeto projeto = buscar(inputData);
        setarValores(projeto, inputData);
        Projeto projetoSalvo = salvar(projeto);

        return atualizarProjetoOutputDataConverter.to(projetoSalvo);
    }

    private void validarDadosEntrada(AtualizarProjetoInputData inputData) {
        Validator.of(inputData)
                .validate(AtualizarProjetoInputData::getId, Objects::nonNull, "O id é nulo")
                .validate(AtualizarProjetoInputData::getNome, Objects::nonNull, "O campo nome é nulo")
                .validate(AtualizarProjetoInputData::getDataHoraInicial, Objects::nonNull, "O campo data inicial é nulo")
                .validate(AtualizarProjetoInputData::getDataHoraFinal, Objects::nonNull, "O campo data final é nulo")
                .validate(AtualizarProjetoInputData::getSituacao, Objects::nonNull, "O campo situação é nulo")
                .validate(AtualizarProjetoInputData::getCategoria, Objects::nonNull, "O campo categoria é nulo")
                .get();
    }

    private Projeto buscar(AtualizarProjetoInputData inputData) {
        return projetoDataProvider.buscarPorId(inputData.getId());
    }

    private void setarValores(Projeto projeto, AtualizarProjetoInputData inputData) {
        projeto.setNome(inputData.getNome());
        projeto.setDescricao(inputData.getDescricao());
        projeto.setDataHoraInicial(LocalDateTime.ofInstant(inputData.getDataHoraInicial().toInstant(), ZoneId.systemDefault()));
        projeto.setDataHoraFinal(LocalDateTime.ofInstant(inputData.getDataHoraFinal().toInstant(), ZoneId.systemDefault()));
        projeto.setSituacao(EnumSituacao.valueOf(inputData.getSituacao()));
        projeto.setCategoria(EnumCategoria.valueOf(inputData.getCategoria()));
    }
    private Projeto salvar(Projeto projeto) {
        return projetoDataProvider.atualizar(projeto);
    }
}
