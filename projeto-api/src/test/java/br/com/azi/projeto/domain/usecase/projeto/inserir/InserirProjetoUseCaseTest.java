package br.com.azi.projeto.domain.usecase.projeto.inserir;

import br.com.azi.projeto.application.config.ProjetoProperties;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.exception.DataFinalMenorQueDataInicialException;
import br.com.azi.projeto.domain.exception.DataInicialNaoEDiaUtilException;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.inserir.converter.InserirProjetoOutputDataConverter;
import br.com.azi.projeto.domain.validation.BadRequestExceptionList;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;

@RunWith(MockitoJUnitRunner.class)
public class InserirProjetoUseCaseTest {

    @Test(expected = BadRequestExceptionList.class)
    public void deveFalharQuandoNaoEnviarCamposObrigatorios() {
        InserirProjetoUseCase usecase = new InserirProjetoUseCase(
                Mockito.mock(ProjetoProperties.class),
                Mockito.mock(ProjetoDataProvider.class),
                new InserirProjetoOutputDataConverter()
        );

        usecase.executar(new InserirProjetoInputData());
    }

    @Test(expected = DataFinalMenorQueDataInicialException.class)
    public void deveFalharDataFinalMenorQueDataInicial() {
        InserirProjetoUseCase usecase = new InserirProjetoUseCase(
                Mockito.mock(ProjetoProperties.class),
                Mockito.mock(ProjetoDataProvider.class),
                new InserirProjetoOutputDataConverter()
        );

        InserirProjetoInputData inputData = InserirProjetoInputData
                .builder()
                .nome("Nome")
                .descricao("Descricao")
                .situacao("ABERTO")
                .categoria("DESENVOLVIMENTO")
                .dataHoraInicial(Date.from(
                        LocalDateTime
                                .now()
                                .withDayOfMonth(10)
                                .atZone(ZoneId.systemDefault())
                                .toInstant()
                ))
                .dataHoraFinal(Date.from(
                        LocalDateTime
                                .now()
                                .withDayOfMonth(1)
                                .atZone(ZoneId.systemDefault())
                                .toInstant()
                ))
                .build();

        usecase.executar(inputData);
    }

    @Test(expected = DataInicialNaoEDiaUtilException.class)
    public void deveFalharDataInicilNaoEDiaUtil() {

        ProjetoProperties projetoProperties = new ProjetoProperties();
        projetoProperties.setFeriados(Collections.singletonList("07/09"));

        InserirProjetoUseCase usecase = new InserirProjetoUseCase(
                projetoProperties,
                Mockito.mock(ProjetoDataProvider.class),
                new InserirProjetoOutputDataConverter()
        );

        InserirProjetoInputData inputData = InserirProjetoInputData
                .builder()
                .nome("Nome")
                .descricao("Descricao")
                .situacao("ABERTO")
                .categoria("DESENVOLVIMENTO")
                .dataHoraInicial(Date.from(
                        LocalDateTime
                                .now()
                                .withDayOfMonth(7)
                                .withMonth(Month.SEPTEMBER.getValue())
                                .atZone(ZoneId.systemDefault())
                                .toInstant()
                ))
                .dataHoraFinal(Date.from(
                        LocalDateTime
                                .now()
                                .withDayOfMonth(10)
                                .withMonth(Month.SEPTEMBER.getValue())
                                .atZone(ZoneId.systemDefault())
                                .toInstant()
                ))
                .build();

        usecase.executar(inputData);
    }

    @Test
    public void deveSalvarOProjeto() {
        ProjetoDataProvider projetoDataProvider = Mockito.mock(ProjetoDataProvider.class);
        InserirProjetoUseCase usecase = new InserirProjetoUseCase(
                Mockito.mock(ProjetoProperties.class),
                projetoDataProvider,
                new InserirProjetoOutputDataConverter()
        );

        InserirProjetoInputData inputData = InserirProjetoInputData
                .builder()
                .nome("Nome")
                .descricao("Descricao")
                .situacao("ABERTO")
                .categoria("DESENVOLVIMENTO")
                .dataHoraInicial(Date.from(
                        LocalDateTime
                                .now()
                                .withDayOfMonth(7)
                                .withMonth(Month.SEPTEMBER.getValue())
                                .atZone(ZoneId.systemDefault())
                                .toInstant()
                ))
                .dataHoraFinal(Date.from(
                        LocalDateTime
                                .now()
                                .withDayOfMonth(10)
                                .withMonth(Month.SEPTEMBER.getValue())
                                .atZone(ZoneId.systemDefault())
                                .toInstant()
                ))
                .build();

        Mockito.when(projetoDataProvider.inserir(any(Projeto.class)))
                .thenReturn(Projeto
                        .builder()
                        .id(1L)
                        .nome("Nome")
                        .descricao("Descricao")
                        .situacao(Projeto.Situacao.ABERTO)
                        .categoria(Projeto.Categoria.DESENVOLVIMENTO)
                        .build());

        InserirProjetoOutputData outputData = usecase.executar(inputData);

        Assert.assertEquals(Long.valueOf(1), outputData.getId());
        Assert.assertEquals("Nome", outputData.getNome());
    }
}
