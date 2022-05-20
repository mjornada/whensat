package br.com.azi.projeto.adapter.entrypoint.projeto;

import br.com.azi.projeto.helper.ProjetoHelper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class BuscarProjetoPorIdIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @Rollback
    @Sql({"/migration/datasets/projeto/buscar-projeto-por-id.sql"})
    @Transactional
    public void deveBuscarProjetoPorId() throws Exception {
        String nome = "projeto por id";
        Integer projetoId = ProjetoHelper.buscarIdProjetoPorNome(this.mockMvc, nome);

        this.mockMvc
                .perform(get(String.format("/projetos/%s", projetoId)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", equalTo(projetoId)))
                .andExpect(jsonPath("$.nome", equalTo(nome)));
    }
}
