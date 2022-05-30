import axios from 'axios'
import ParamUtils from '@/core/utils/ParamUtils'

class ProjetoApiClient {
	async buscarTodos(filtros, paginacao) {
		return await axios.get(`/projeto/api/projetos?${ParamUtils.ObjectsToParams([paginacao, filtros])}`)
	}

	async buscarPorId(id) {
		return await axios.get(`/projeto/api/projetos/${id}`)
	}

	async inserir(dados) {
		return await axios.post('/projeto/api/projetos', dados)
	}

	async editar(id, dados) {
		return await axios.put(`/projeto/api/projetos/${id}`, dados)
	}

	async excluir(id) {
		return await axios.delete(`/projeto/api/projetos/${id}`)
	}
}

export default new ProjetoApiClient()
