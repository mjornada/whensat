package br.com.azi.projeto.adapter.gateway.dataprovider;

import br.com.azi.projeto.adapter.gateway.dataprovider.repository.ProjetoRepository;
import br.com.azi.projeto.domain.entity.Projeto;
import br.com.azi.projeto.domain.exception.ProjetoNaoEncontradoException;
import br.com.azi.projeto.domain.interfaces.dataprovider.ProjetoDataProvider;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ProjetoDataProviderImpl implements ProjetoDataProvider {

    ProjetoRepository projetoRepository;

    @Override
    public Projeto buscarPorId(Long id) {
        return projetoRepository.findById(id)
                .orElseThrow(() -> new ProjetoNaoEncontradoException(id));
    }

    @Override
    public Projeto inserir(Projeto projeto) {
        return projetoRepository.save(projeto);
    }

    @Override
    public Projeto atualizar(Projeto projeto) {
        return projetoRepository.save(projeto);
    }
}
