import axios from 'axios'
import ParamUtils from '../utils/ParamUtils'

class ProjetoApiClient {

    async buscarPorId(projetoId) {
        return axios.get(`/projeto/api/v1/projetos/${projetoId}`)
    }

    async buscarNomesDosProjetos(projeto) {
        return axios.get(`/projeto/api/v1/projetos/por-nome?conteudo=${projeto}`)
    }

    async buscarResumo(projetoId) {
        return new Promise((resolve) => {
            resolve({
                data: {
                    id: 23,
                    situacao: 'ABERTO'
                }
            })
        })
    }

    async buscarTodos(filtros, paginacao) {
        return axios.get(`/projeto/api/v1/projetos?${ParamUtils.ObjectsToParams([paginacao, filtros])}`)
    }

    async inserir(dados) {
        return axios.post(`/projeto/api/v1/projetos`, dados)
    }

    async salvar(dados) {
        return axios.put(`/projeto/api/v1/projetos/${dados.id}`, dados)
    }
}

export default new ProjetoApiClient()