package br.com.azi.projeto.helper;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

public class ProjetoHelper {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public static Integer buscarIdProjetoPorNome(MockMvc mockMvc, String nome) throws Exception {
        MvcResult mvcResult = mockMvc
                .perform(get(String.format("/projetos?page=1&rowsPerPage=10&nome=%s", nome)))
                .andReturn();

        Map projetos = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), Map.class);
        Map projeto = (Map) ((List) projetos.get("itens")).get(0);

        return (Integer) projeto.get("id");
    }
}
