import api from '@/core/apiclient'
import {actionTypes, mutationTypes, produto} from '@/core/constants'

export default {

    async [actionTypes.COMUM.BUSCAR_PRODUTO_POR_NOME]({commit}) {
        const {data} = await api.produto.buscarPorNome(produto.NOME)
        commit(mutationTypes.COMUM.SET_PRODUTO, data)
    },

    async [actionTypes.COMUM.BUSCAR_USUARIO_LOGADO]({commit, state}) {
        const produtoId = state.loki.product.id
        const {data} = await api.usuario.buscarLogado(produtoId)
        commit(mutationTypes.COMUM.SET_USUARIO_LOGADO, data)
    },

    async [actionTypes.COMUM.BUSCAR_LINK_EDITAR_USUARIO]({state}) {
        const payload = {
            uri: window.location.origin + window.location.pathname,
            produto: state.loki.product.name
        }
        const {data} = await api.usuario.editar(payload)
        return data
    },

    async [actionTypes.PROJETO.BUSCAR_DADOS_GERAIS]({commit}, projetoId) {
        const {data} = await api.projeto.buscarPorId(projetoId)
        commit(mutationTypes.PROJETO.SET_DADOS_GERAIS, data)
    },

    async [actionTypes.PROJETO.BUSCAR_NOMES_DOS_PROJETOS]({commit}, projeto) {
        const {data} = await api.projeto.buscarNomesDosProjetos(projeto)
        commit(mutationTypes.PROJETO.SET_AUTOCOMPLETE_NOMES_DOS_PROJETOS, data.itens)
    },

    async [actionTypes.PROJETO.BUSCAR_RESUMO_DO_PROJETO]({commit}, projetoId) {
        const {data} = await api.projeto.buscarPorId(projetoId)
        commit(mutationTypes.PROJETO.SET_RESUMO_DO_PROJETO, data)
        commit(mutationTypes.PROJETO.SET_AUTOCOMPLETE_NOMES_DOS_PROJETOS, [data])
    },

    async [actionTypes.PROJETO.BUSCAR_TAREFAS]({commit}, projetoId) {
        const {data} = await api.tarefa.buscarPorProjetoId(projetoId)
        commit(mutationTypes.PROJETO.SET_TAREFAS, data.itens)
    },

    async [actionTypes.PROJETO.BUSCAR_TODOS_PROJETOS]({state}) {
        const {filtros, paginacao} = state.projeto.resultadoBuscaTodosProjetos
        const {data} = await api.projeto.buscarTodos(filtros, paginacao)
        return data
    },

    async [actionTypes.PROJETO.REMOVER_TAREFA]({commit}, tarefaId) {
        await api.tarefa.remover(tarefaId)
        commit(mutationTypes.PROJETO.SET_REMOVER_TAREFA, tarefaId)
    },

    async [actionTypes.PROJETO.SALVAR_DADOS_GERAIS]({commit}, dados) {
        const {data} = await api.projeto.salvar(dados)
        commit(mutationTypes.PROJETO.SET_DADOS_GERAIS, data)
    },

    async [actionTypes.PROJETO.SALVAR_NOVO_DADOS_GERAIS]({commit}, dados) {
        const {data} = await api.projeto.inserir(dados)
        commit(mutationTypes.PROJETO.SET_DADOS_GERAIS, data)
        commit(mutationTypes.PROJETO.SET_RESUMO_DO_PROJETO, data)
    },

    async [actionTypes.PROJETO.EDITAR_TAREFA](context, tarefa) {
        return await api.tarefa.editar(tarefa)
    },

    async [actionTypes.PROJETO.SALVAR_TAREFA](context, tarefa) {
        return await api.tarefa.salvar(tarefa)
    }

}
