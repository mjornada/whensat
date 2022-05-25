import actions from './actions'
import {actionTypes, mutationTypes} from '@/core/constants'
import axios from 'axios'

let url, body, mockResponseData, returnedResponse

jest.mock('axios', () => ({
    post(_url, _body) {
        return new Promise((resolve) => {
            url = _url
            body = _body
            resolve({data: mockResponseData})
        })
    },
    put(_url, _body) {
        return new Promise((resolve) => {
            url = _url
            body = _body
            resolve({data: mockResponseData})
        })
    },
    get(_url) {
        return new Promise((resolve) => {
            url = _url
            resolve({data: mockResponseData})
        })
    },
    delete(_url) {
        return new Promise((resolve) => {
            url = _url
            resolve()
        })
    }
}))

describe('Actions', () => {
    const commit = jest.fn()
    const dispatch = jest.fn()
    const projetoId = 40
    let state

    beforeEach(() => {
        url = ''
        body = undefined
        mockResponseData = true
        state = {
            loki: {
                product: {
                    id: 1,
                    name: 'compra-direta'
                }
            }
        }
    })

    it('COMUM.BUSCAR_PRODUTO_POR_NOME', async () => {
        const packageJson = {name: 'compra-direta'}
        returnedResponse = await actions[actionTypes.COMUM.BUSCAR_PRODUTO_POR_NOME]({commit}, packageJson)
        expect(url).toBe(`/hal/public/produtos?produtoNome=projeto`)
        expect(commit).toHaveBeenCalledWith(mutationTypes.COMUM.SET_PRODUTO, true)
    })

    it('COMUM.BUSCAR_USUARIO_LOGADO', async () => {
        returnedResponse = await actions[actionTypes.COMUM.BUSCAR_USUARIO_LOGADO]({commit, state})
        expect(url).toBe(`/hal/usuario/sessao?produtoId=${state.loki.product.id}`)
        expect(commit).toHaveBeenCalledWith(mutationTypes.COMUM.SET_USUARIO_LOGADO, true)
    })

    it('COMUM.BUSCAR_LINK_EDITAR_USUARIO', async () => {
        const payload = {'produto': 'compra-direta', 'uri': 'http://localhost/'}

        returnedResponse = await actions[actionTypes.COMUM.BUSCAR_LINK_EDITAR_USUARIO]({state})
        expect(url).toBe(`/hal/editarUsuario`)
        expect(body).toEqual(payload)
        expect(returnedResponse).toBeTruthy()
    })

    it('PROJETO.BUSCAR_DADOS_GERAIS', async () => {
        await actions[actionTypes.PROJETO.BUSCAR_DADOS_GERAIS]({commit}, projetoId)
        expect(url).toBe(`/projeto/api/v1/projetos/${projetoId}`)
        expect(commit).toHaveBeenCalledWith(mutationTypes.PROJETO.SET_DADOS_GERAIS, true)
    })

    it('PROJETO.BUSCAR_NOMES_DOS_PROJETOS', async () => {
        const projeto = 'Treinamento'
        await actions[actionTypes.PROJETO.BUSCAR_NOMES_DOS_PROJETOS]({commit}, projeto)
        expect(url).toEqual(`/projeto/api/v1/projetos/por-nome?conteudo=${projeto}`)
        expect(commit).toHaveBeenCalledWith(mutationTypes.PROJETO.SET_AUTOCOMPLETE_NOMES_DOS_PROJETOS, undefined)
    })

    it('PROJETO.BUSCAR_RESUMO_DO_PROJETO', async () => {
        await actions[actionTypes.PROJETO.BUSCAR_RESUMO_DO_PROJETO]({commit}, projetoId)
        expect(url).toEqual(`/projeto/api/v1/projetos/${projetoId}`)
        expect(commit).toHaveBeenCalledWith(mutationTypes.PROJETO.SET_RESUMO_DO_PROJETO, true)
    })

    it('PROJETO.BUSCAR_TAREFAS', async () => {
        await actions[actionTypes.PROJETO.BUSCAR_TAREFAS]({commit}, projetoId)
        expect(url).toEqual(`/projeto/api/v1/projetos/${projetoId}/tarefas`)
        expect(commit).toHaveBeenCalledWith(mutationTypes.PROJETO.SET_TAREFAS, undefined)
    })

    it('PROJETO.BUSCAR_TODOS_PROJETOS', async () => {
        state = {
            projeto: {
                resultadoBuscaTodosProjetos: {
                    filtros: {
                        objeto: {
                            value: 'regulamento'
                        },
                        situacoes: ['EM_ELABORACAO', 'ABERTA', 'EM_ANALISE', 'ENCERRADA']
                    },
                    paginacao: {
                        page: 1,
                        rowsPerPage: 10
                    }
                }
            }
        }

        returnedResponse = await actions[actionTypes.PROJETO.BUSCAR_TODOS_PROJETOS]({state})
        expect(url).toBe(`/projeto/api/v1/projetos?page=1&rowsPerPage=10&situacoes=EM_ELABORACAO&situacoes=ABERTA&situacoes=EM_ANALISE&situacoes=ENCERRADA`)
        expect(returnedResponse).toBeTruthy()
    })

    it('PROJETO.REMOVER_TAREFA', async () => {
        const tarefaId = 45
        await actions[actionTypes.PROJETO.REMOVER_TAREFA]({commit}, tarefaId)
        expect(url).toEqual(`/projeto/api/v1/tarefas/${tarefaId}`)
        expect(commit).toHaveBeenCalledWith(mutationTypes.PROJETO.SET_REMOVER_TAREFA, tarefaId)
    })

    it('PROJETO.SALVAR_DADOS_GERAIS', async () => {
        const dados = {
            id: 19
        }
        await actions[actionTypes.PROJETO.SALVAR_DADOS_GERAIS]({commit}, dados)
        expect(url).toEqual(`/projeto/api/v1/projetos/${dados.id}`)
        expect(commit).toHaveBeenCalledWith(mutationTypes.PROJETO.SET_DADOS_GERAIS, true)
    })

    it('PROJETO.SALVAR_TAREFA', async () => {
        const tarefa = {
            id: 54
        }
        await actions[actionTypes.PROJETO.SALVAR_TAREFA](tarefa)
        expect(url).toEqual(`/projeto/api/v1/tarefas`)
        expect(returnedResponse).toBeTruthy()
    })
})
