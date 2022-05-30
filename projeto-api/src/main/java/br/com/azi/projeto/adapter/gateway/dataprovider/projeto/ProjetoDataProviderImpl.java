package br.com.azi.projeto.adapter.gateway.dataprovider.projeto;

import br.com.azi.projeto.adapter.gateway.dataprovider.converter.FiltroConverter;
import br.com.azi.projeto.domain.dto.ListaPaginadaDTO;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.entity.QProjeto;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProjetoDataProviderImpl implements ProjetoDataProvider {

    ProjetoRepository projetoRepository;

    @Override
    public Projeto buscarPorId(Long id) {
        return projetoRepository.findById(id).orElse(null);
    }

    @Override
    public Projeto inserir(Projeto projeto) {
        return projetoRepository.save(projeto);
    }

    @Override
    public Projeto atualizar(Projeto projeto) {
        return projetoRepository.save(projeto);
    }

    @Override
    public ListaPaginadaDTO<Projeto> buscarPorFiltro(Projeto.Filtro filtro) {
        QProjeto qProjeto = QProjeto.projeto;
        BooleanExpression expression = qProjeto.id.isNotNull();

        if (StringUtils.isNotEmpty(filtro.getNome())) {
            BooleanExpression nomeExp = qProjeto.nome.upper().contains(filtro.getNome().toUpperCase());
            expression = expression.and(nomeExp);
        }

        Page<Projeto> projetos = projetoRepository.findAll(expression, FiltroConverter.extrairPaginacao(filtro));

        return ListaPaginadaDTO.<Projeto>builder()
                .items(projetos.getContent())
                .totalElements(projetos.getTotalElements())
                .totalPages((long) projetos.getTotalPages())
                .build();
    }

    @Override
    public void remover(Long id) {
        projetoRepository.deleteById(id);
    }
}
