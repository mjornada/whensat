package br.com.azi.projeto.domain.usecase.projeto.remover;

import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.exception.ProjetoNaoEncontradoException;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.validation.BadRequestExceptionList;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class RemoverProjetoUseCaseTest {

    @Test(expected = BadRequestExceptionList.class)
    public void deveFalharQuandoNaoEnviarCamposObrigatorios() {
        RemoverProjetoUseCase useCase = RemoverProjetoUseCase.builder()
                .projetoDataProvider(Mockito.mock(ProjetoDataProvider.class))
                .build();

        useCase.executar(new RemoverProjetoInputData());
    }

    @Test(expected = ProjetoNaoEncontradoException.class)
    public void deveFalharQuandoProjetoNaoExistir() {
        ProjetoDataProvider projetoDataProvider = Mockito.mock(ProjetoDataProvider.class);

        RemoverProjetoUseCase useCase = RemoverProjetoUseCase.builder()
                .projetoDataProvider(projetoDataProvider)
                .build();

        Long projetoId = 1L;

        RemoverProjetoInputData input = RemoverProjetoInputData.builder()
                .id(projetoId)
                .build();

        when(projetoDataProvider.buscarPorId(projetoId)).thenReturn(null);

        useCase.executar(input);
    }

    @Test
    public void deveExcluirProjetoComSucesso() {
        ProjetoDataProvider projetoDataProvider = Mockito.mock(ProjetoDataProvider.class);

        RemoverProjetoUseCase useCase = RemoverProjetoUseCase.builder()
                .projetoDataProvider(projetoDataProvider)
                .build();

        Long projetoId = 1L;

        RemoverProjetoInputData input = RemoverProjetoInputData.builder()
                .id(projetoId)
                .build();

        when(projetoDataProvider.buscarPorId(projetoId)).thenReturn(new Projeto());

        useCase.executar(input);

        verify(projetoDataProvider, Mockito.times(1)).remover(projetoId);
    }
}
