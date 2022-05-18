package br.com.azi.projeto.adapter.gateway.dataprovider.projeto;

import br.com.azi.projeto.domain.entity.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long>, QuerydslPredicateExecutor<Projeto> {
}
