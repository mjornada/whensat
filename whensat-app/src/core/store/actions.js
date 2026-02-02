import api from '@/core/apiclient'
import { actionTypes, mutationTypes, produto } from '@/core/constants'

export default {
	async [actionTypes.COMUM.BUSCAR_PRODUTO_POR_NOME]({ commit }) {
		const { data } = await api.produto.buscarPorNome(produto.NOME)
		commit(mutationTypes.COMUM.SET_PRODUTO, data)
	},

	async [actionTypes.COMUM.BUSCAR_USUARIO_LOGADO]({ commit, state }) {
		const produtoId = state.loki.product.id
		const { data } = await api.usuario.buscarLogado(produtoId)
		commit(mutationTypes.COMUM.SET_USUARIO_LOGADO, data)
	},

	async [actionTypes.COMUM.BUSCAR_LINK_EDITAR_USUARIO]({ state }) {
		const payload = {
			produto: state.loki.product.name,
			uri: window.location.origin + window.location.pathname,
		}
		const { data } = await api.usuario.editar(payload)
		return data
	},

	async [actionTypes.PROJETO.BUSCAR_TODOS]({ state }) {
		const { filtros, paginacao } = state.projeto.resultadoBuscaTodosProjetos
		const { data } = await api.projeto.buscarTodos(filtros, paginacao)
		return data
	},

	async [actionTypes.PROJETO.SALVAR_NOVO]({ commit }, dados) {
		const { data } = await api.projeto.inserir(dados)
		commit(mutationTypes.PROJETO.SET_DADOS_PROJETO, data)
	},

	async [actionTypes.PROJETO.BUSCAR_POR_ID]({ commit }, projetoId) {
		const { data } = await api.projeto.buscarPorId(projetoId)
		commit(mutationTypes.PROJETO.SET_DADOS_PROJETO, data)
	},

	async [actionTypes.PROJETO.EDITAR]({ commit }, dados) {
		const { data } = await api.projeto.editar(dados.id, dados)
		commit(mutationTypes.PROJETO.SET_DADOS_PROJETO, data)
	},

	async [actionTypes.PROJETO.EXCLUIR]({ state }, projetoId) {
		await api.projeto.excluir(projetoId)
	},
}
