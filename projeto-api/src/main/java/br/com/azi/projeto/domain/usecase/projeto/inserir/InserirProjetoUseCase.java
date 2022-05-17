package br.com.azi.projeto.domain.usecase.projeto.inserir;

import br.com.azi.projeto.application.config.ProjetoProperties;
import br.com.azi.projeto.domain.commons.date.CalendarioUtils;
import br.com.azi.projeto.domain.constant.projeto.EnumCategoria;
import br.com.azi.projeto.domain.constant.projeto.EnumSituacao;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.exception.DataFinalMenorQueDataInicialException;
import br.com.azi.projeto.domain.exception.DataInicialNaoEDiaUtilException;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.inserir.converter.InserirProjetoOutputDataConverter;
import br.com.azi.projeto.domain.validation.Validator;
import lombok.Builder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;

@Builder
public class InserirProjetoUseCase {

    private ProjetoProperties projetoProperties;
    private ProjetoDataProvider projetoDataProvider;
    private InserirProjetoOutputDataConverter inserirProjetoOutputDataConverter;

    public InserirProjetoOutputData executar(InserirProjetoInputData inputData) {
        validarDadosEntrada(inputData);
        validarDataInicial(inputData);
        validarDataFinal(inputData);

        Projeto projeto = criarProjeto(inputData);
        Projeto projetoSalvo = salvar(projeto);

        return inserirProjetoOutputDataConverter.to(projetoSalvo);
    }

    private Projeto salvar(Projeto projeto) {
        return projetoDataProvider.inserir(projeto);
    }

    private void validarDadosEntrada(InserirProjetoInputData inputData) {
        Validator.of(inputData)
                .validate(InserirProjetoInputData::getNome, Objects::nonNull, "O campo nome é nulo")
                .validate(InserirProjetoInputData::getDataHoraInicial, Objects::nonNull, "O campo data inicial é nulo")
                .validate(InserirProjetoInputData::getDataHoraFinal, Objects::nonNull, "O campo data final é nulo")
                .validate(InserirProjetoInputData::getSituacao, Objects::nonNull, "O campo situação é nulo")
                .validate(InserirProjetoInputData::getCategoria, Objects::nonNull, "O campo categoria é nulo")
                .get();
    }

    private void validarDataInicial(InserirProjetoInputData inputData) {

        CalendarioUtils calendario = new CalendarioUtils(projetoProperties.getFeriados());
        if (calendario.naoEDiaUtil(LocalDateTime.ofInstant(inputData.getDataHoraInicial().toInstant(), ZoneId.systemDefault()))) {
            throw new DataInicialNaoEDiaUtilException();
        }
    }

    private void validarDataFinal(InserirProjetoInputData inputData) {
        if (inputData.getDataHoraFinal().before(inputData.getDataHoraInicial())) {
            throw new DataFinalMenorQueDataInicialException();
        }
    }

    private Projeto criarProjeto(InserirProjetoInputData inputData) {
        return Projeto.builder()
                .nome(inputData.getNome())
                .descricao(inputData.getDescricao())
                .dataHoraInicial(LocalDateTime.ofInstant(inputData.getDataHoraInicial().toInstant(), ZoneId.systemDefault()))
                .dataHoraFinal(LocalDateTime.ofInstant(inputData.getDataHoraFinal().toInstant(), ZoneId.systemDefault()))
                .situacao(EnumSituacao.valueOf(inputData.getSituacao()))
                .categoria(EnumCategoria.valueOf(inputData.getCategoria()))
                .build();
    }
}
