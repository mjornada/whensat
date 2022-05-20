package br.com.azi.projeto.adapter.entrypoint.projeto;

import br.com.azi.projeto.domain.usecase.projeto.inserir.InserirProjetoInputData;
import br.com.azi.projeto.helper.JsonHelper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.util.Date;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class InserirProjetoIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    @Transactional
    public void deveSalvar() throws Exception {
        InserirProjetoInputData inputData = InserirProjetoInputData
                .builder()
                .nome("Nome")
                .descricao("Descricao")
                .categoria("DESENVOLVIMENTO")
                .situacao("ABERTO")
                .dataHoraInicial(Date.from(
                        LocalDateTime
                                .now()
                                .withDayOfMonth(19)
                                .withMonth(Month.MAY.getValue())
                                .atZone(ZoneId.systemDefault())
                                .toInstant()
                ))
                .dataHoraFinal(Date.from(
                        LocalDateTime
                                .now()
                                .withDayOfMonth(19)
                                .withMonth(Month.MAY.getValue())
                                .atZone(ZoneId.systemDefault())
                                .toInstant()
                ))
                .build();

        mockMvc.perform(
                        post("/projetos")
                                .content(JsonHelper.toJson(inputData))
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.nome", equalTo("Nome")));
    }
}
