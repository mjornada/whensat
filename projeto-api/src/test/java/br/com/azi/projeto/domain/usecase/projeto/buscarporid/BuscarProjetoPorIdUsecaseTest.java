package br.com.azi.projeto.domain.usecase.projeto.buscarporid;

import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.exception.ProjetoNaoEncontradoException;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import br.com.azi.projeto.domain.usecase.projeto.buscarporid.converter.BuscarProjetoPorIdOutputDataConverter;
import br.com.azi.projeto.domain.validation.BadRequestExceptionList;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class BuscarProjetoPorIdUsecaseTest {

    @Test(expected = BadRequestExceptionList.class)
    public void deveFalharQuandoNaoPassarId() {
        BuscarProjetoPorIdUseCase usecase = new BuscarProjetoPorIdUseCase(Mockito.mock(ProjetoDataProvider.class), new BuscarProjetoPorIdOutputDataConverter());
        usecase.executar(new BuscarProjetoPorIdInputData());
    }

    @Test(expected = ProjetoNaoEncontradoException.class)
    public void deveFalharQuandoProjetoNaoExistir() {
        ProjetoDataProvider projetoDataProvider = Mockito.mock(ProjetoDataProvider.class);
        BuscarProjetoPorIdUseCase usecase = new BuscarProjetoPorIdUseCase(
                projetoDataProvider,
                new BuscarProjetoPorIdOutputDataConverter()
        );

        when(projetoDataProvider.buscarPorId(any(Long.class))).thenReturn(null);

        BuscarProjetoPorIdInputData input = new BuscarProjetoPorIdInputData(1L);
        usecase.executar(input);
    }

    @Test
    public void deveRetornarOProjeto() {
        ProjetoDataProvider projetoDataProvider = Mockito.mock(ProjetoDataProvider.class);
        BuscarProjetoPorIdUseCase usecase = new BuscarProjetoPorIdUseCase(
                projetoDataProvider,
                new BuscarProjetoPorIdOutputDataConverter()
        );

        when(projetoDataProvider.buscarPorId(any(Long.class)))
                .thenReturn(
                        Projeto.builder()
                                .id(1L)
                                .nome("Nome")
                                .descricao("Descricao")
                                .situacao(Projeto.Situacao.ABERTO)
                                .categoria(Projeto.Categoria.DESENVOLVIMENTO)
                                .build());

        BuscarProjetoPorIdInputData input = new BuscarProjetoPorIdInputData(1L);

        BuscarProjetoPorIdOutputData outputData = usecase.executar(input);

        Assert.assertEquals(Long.valueOf(1), outputData.getId());
        Assert.assertEquals("Nome", outputData.getNome());
        Assert.assertEquals("ABERTO", outputData.getSituacao());
        Assert.assertEquals("DESENVOLVIMENTO", outputData.getCategoria());
    }

}
