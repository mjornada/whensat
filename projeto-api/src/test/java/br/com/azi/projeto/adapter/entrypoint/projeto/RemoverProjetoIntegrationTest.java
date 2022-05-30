package br.com.azi.projeto.adapter.entrypoint.projeto;

import br.com.azi.projeto.helper.ProjetoHelper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class RemoverProjetoIntegrationTest {

    @Autowired
    private MockMvc mock;

    @Sql({"/migration/datasets/projeto/remover-projeto.sql"})
    @Test
    @Transactional
    public void deveRemoverProjetoComSucesso() throws Exception {
        String produtoNome = "Nasci para ser excluído";

        Integer projetoId = ProjetoHelper.buscarIdProjetoPorNome(this.mock, produtoNome);

        this.mock.perform(
                delete(String.format("/projetos/%d", projetoId))
        ).andExpect(status().isNoContent());
    }
}
