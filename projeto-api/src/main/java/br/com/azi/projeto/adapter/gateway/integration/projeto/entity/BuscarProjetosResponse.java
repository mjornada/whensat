package br.com.azi.projeto.adapter.gateway.integration.projeto.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuscarProjetosResponse {

    private List<Item> values;
    private Long total;
    private Long startAt;
    private Long maxResults;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Item {
        private Long id;
        private String name;
        private String projectTypeKey;
    }
}
