import axios from 'axios'

class TarefaApiClient {

    async buscarPorProjetoId(projetoId) {
        return axios.get(`/projeto/api/v1/projetos/${projetoId}/tarefas`)
    }

    async remover(tarefaId) {
        return axios.delete(`/projeto/api/v1/tarefas/${tarefaId}`)
    }

    async editar(tarefa) {
        return axios.put(`/projeto/api/v1/tarefas/${tarefa.id}`, tarefa)
    }

    async salvar(tarefa) {
        return axios.post(`/projeto/api/v1/tarefas`, tarefa)
    }

}

export default new TarefaApiClient()