package br.com.azi.projeto.domain.entity;

import br.com.azi.projeto.domain.constant.projeto.EnumCategoria;
import br.com.azi.projeto.domain.constant.projeto.EnumSituacao;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TB_PROJETO", schema = "PROJETO")
@SequenceGenerator(name = "SEQ_PROJETO", sequenceName = "PROJETO.SEQ_PROJETO", allocationSize = 1)
@AttributeOverrides({
        @AttributeOverride(name = "dataCadastro", column = @Column(name = "PR_DTHR_CADASTRO")),
        @AttributeOverride(name = "dataAlteracao", column = @Column(name = "PR_DTHR_ALTERACAO")),
        @AttributeOverride(name = "usuarioCadastro", column = @Column(name = "PR_USUARIO_CADASTRO")),
        @AttributeOverride(name = "usuarioAlteracao", column = @Column(name = "PR_USUARIO_ALTERACAO"))
})
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQ_PROJETO")
    @Column(name = "PR_ID")
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "PR_NOME", length = 100)
    private String nome;

    @Column(name = "PR_DESCRICAO", length = 500)
    private String descricao;

    @Column(name = "PR_DTHR_INICIAL")
    private LocalDateTime dataHoraInicial;

    @Column(name = "PR_DTHR_FINAL")
    private LocalDateTime dataHoraFinal;

    @Column(name = "PR_SITUACAO", length = 20)
    @Enumerated(EnumType.STRING)
    private EnumSituacao situacao;

    @Column(name = "PR_CATEGORIA", length = 20)
    @Enumerated(EnumType.STRING)
    private EnumCategoria categoria;

    @Column(name = "PR_URI_LOGO", length = 500)
    private String uriLogo;
}
