package br.com.azi.projeto.adapter.entrypoint.projeto;

import br.com.azi.projeto.helper.FileHelper;
import com.github.tomakehurst.wiremock.client.WireMock;
import com.github.tomakehurst.wiremock.junit.WireMockRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static com.github.tomakehurst.wiremock.client.WireMock.aResponse;
import static com.github.tomakehurst.wiremock.client.WireMock.urlEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class BuscarListagemProjetosSistemaExternoIntegrationTest {

        @Autowired
        private MockMvc mockMvc;

        @Rule
        public WireMockRule wireMockRule = new WireMockRule(8022);

        @Test
        @Rollback
        @Transactional
        @Sql({"/migration/datasets/projeto/buscar-projeto-por-id.sql"})
        public void deveBuscarProjetos() throws Exception {
            if (System.getProperty("os.name").equals("Linux")) {
                createMockRequisicaoMock();

                this.mockMvc
                        .perform(get("/projetos/sistema-externo"))
                        .andExpect(status().is2xxSuccessful())
                        .andExpect(jsonPath("$.itens", hasSize(2)));
            }
        }

        private void createMockRequisicaoMock() {
            String response = FileHelper.getJson("jira", "jira.json");

            wireMockRule.stubFor(WireMock.get(urlEqualTo("/rest/api/3/project/search"))
                    .willReturn(aResponse()
                            .withStatus(200)
                            .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                            .withBody(response)));
        }
}
