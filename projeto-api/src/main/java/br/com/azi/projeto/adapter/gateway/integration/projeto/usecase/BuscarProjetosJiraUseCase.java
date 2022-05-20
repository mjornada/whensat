package br.com.azi.projeto.adapter.gateway.integration.projeto.usecase;

import br.com.azi.projeto.adapter.gateway.integration.projeto.converter.BuscarProjetosConverter;
import br.com.azi.projeto.adapter.gateway.integration.projeto.entity.BuscarProjetosResponse;
import br.com.azi.projeto.adapter.gateway.integration.projeto.exception.BuscaListagemProjetosJiraException;
import br.com.azi.projeto.adapter.gateway.integration.utils.JsonUtils;
import br.com.azi.projeto.adapter.gateway.integration.utils.RestUtils;
import br.com.azi.projeto.adapter.gateway.integration.utils.UrlBuilder;
import br.com.azi.projeto.application.config.ProjetoProperties;
import br.com.azi.projeto.domain.dto.ListaPaginadaDTO;
import br.com.azi.projeto.domain.dto.ProjetoDTO;
import lombok.AllArgsConstructor;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@AllArgsConstructor
public class BuscarProjetosJiraUseCase {

    private static final String PATH_TO_BUSCA = "/rest/api/3/project/search";

    public static final String BASIC_TYPE = "Basic";

    private JsonUtils jsonUtils;
    private UrlBuilder urlBuilder;
    private RestUtils restUtils;
    private BuscarProjetosConverter buscarProjetosConverter;

    public ListaPaginadaDTO<ProjetoDTO> executar(ProjetoProperties projetoProperties) {
        String url = criarUrl(projetoProperties);
        Request request = cricarRequisicao(url, projetoProperties);

        try {
            Response response = restUtils.execute(request);
            handleStatusError(response);
            BuscarProjetosResponse projetosResponse = converterRetorno(response);
            return buscarProjetosConverter.converter(projetosResponse);
        } catch (IOException e) {
            throw new BuscaListagemProjetosJiraException("Não foi possivel realizar busca de projetos no Jira.");
        }
    }

    private String criarUrl(ProjetoProperties projetoProperties) {
        return urlBuilder
                .domain(projetoProperties.getIntegration().getJira().getUri())
                .path(PATH_TO_BUSCA)
                .build();
    }

    private Request cricarRequisicao(String url, ProjetoProperties projetoProperties) {
        return new Request.Builder()
                .get()
                .url(url)
                .addHeader("authorization", getBasicAcces(projetoProperties))
                .build();
    }

    private String getBasicAcces(ProjetoProperties projetoProperties) {
        StringBuilder basicAcces = new StringBuilder();
        basicAcces.append(BASIC_TYPE);
        basicAcces.append(" ");
        basicAcces.append(projetoProperties.getIntegration().getJira().getToken());

        return basicAcces.toString();
    }

    private void handleStatusError(Response response) {
        if (!response.isSuccessful()) {
            throw new BuscaListagemProjetosJiraException("Não foi possivel realizar busca de projetos no Jira.");
        }
    }

    private BuscarProjetosResponse converterRetorno(Response response) throws IOException {
        return jsonUtils.fromJson(response.body().string(), BuscarProjetosResponse.class);
    }
}
