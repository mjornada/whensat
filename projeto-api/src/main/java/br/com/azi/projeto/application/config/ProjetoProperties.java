package br.com.azi.projeto.application.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@Data
@ConfigurationProperties(prefix = "az.projeto")
public class ProjetoProperties {
    List<String> feriados;
    Integration integration = new Integration();

    @Data
    public class Integration {
        String sistemaDeControleDeTarefas;
        Redmine redmine = new Redmine();

        @Data
        public class Redmine {
            String uri;
        }
    }
}
