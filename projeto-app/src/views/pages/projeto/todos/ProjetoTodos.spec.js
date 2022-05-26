import {shallowMount} from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import {actionTypes, mutationTypes} from '@/core/constants'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import TodosProjetos from './TodosProjetos'

let criarStore = ({state, getters, mutations, actions}) => {
    return new Vuex.Store({state, getters, mutations, actions})
}

describe('TodosProjetos', () => {
    let wrapper, mutations, actions, localVue, router, state

    const projetos = {
        content: [
            {
                id: 10,
                situacao: 'ABERTO'
            }
        ],
        totalElements: 1,
        totalPages: 1,
        last: true,
        first: true,
        sort: [{
            direction: 'DESC',
            property: 'dataHoraAbertura',
            ignoreCase: false,
            nullHandling: 'NATIVE',
            ascending: false,
            descending: true
        }],
        numberOfElements: 1,
        size: 10,
        number: 0
    }

    beforeEach(() => {
        localVue = applicationTestBuilder.build()

        router = {
            init: jest.fn(),
            push: jest.fn(),
            history: {current: {}}
        }

        state = {
            loki: {
                user: {
                    domainId: 1,
                    type: 'INTERNO',
                    authorities: [
                        {
                            hasAccess: true,
                            name: 'Comprador.Admin'
                        }
                    ]
                }
            },
            projeto: {
                resultadoBuscaTodosProjetos: {
                    paginacao: {
                        page: 0, rowsPerPage: 10, descending: false
                    },
                    filtros: {
                        conteudo: '',
                        objeto: {
                            value: null,
                            default: null,
                            label: 'Pesquisa'
                        },
                        categoria: {
                            value: null,
                            default: null,
                            label: 'Categoria'
                        }
                    }
                }
            }
        }

        mutations = {
            [mutationTypes.PROJETO.SET_FILTROS_BUSCA_TODOS_PROJETOS]: jest.fn(),
            [mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS_PROJETOS]: jest.fn(),
            [mutationTypes.LOKI.SET_LOADING_MESSAGE]: jest.fn(),
            [mutationTypes.LOKI.SHOW_ALERT]: jest.fn(),
            [mutationTypes.SET_ROTA_ORIGEM]: jest.fn()
        }

        actions = {
            [actionTypes.PROJETO.BUSCAR_TODOS_PROJETOS]: jest.fn().mockReturnValue(projetos)
        }
    })

    describe('Events', () => {
        it('Deve emitir o evento de paginar quando alterar a paginação', async () => {
            wrapper = shallowMount(TodosProjetos, {
                localVue,
                store: criarStore({state, mutations, actions}),
                stubs: {
                    TodosProjetosTabela: '<div><button class="stub" @click="$emit(\'paginar\', {})"></button></div>'
                }
            })

            wrapper.find('button[class="stub"]').trigger('click')
            await flushPromises()

            expect(mutations[mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS_PROJETOS].mock.calls[0][1]).toEqual({})
            expect(mutations[mutationTypes.LOKI.SET_LOADING_MESSAGE].mock.calls[0][1]).toBe('Carregando projetos...')
            expect(actions[actionTypes.PROJETO.BUSCAR_TODOS_PROJETOS]).toHaveBeenCalled()
        })

        it('Deve emitir o evendo de buscar simples', async () => {
            wrapper = shallowMount(TodosProjetos, {
                localVue,
                store: criarStore({state, mutations, actions}),
                stubs: {
                    'az-search': '<div><button class="stub" @click="$emit(\'simple-search\', \'Aquisição\')"></button></div>'
                }
            })

            wrapper.find('button[class="stub"]').trigger('click')
            await flushPromises()

            expect(mutations[mutationTypes.PROJETO.SET_FILTROS_BUSCA_TODOS_PROJETOS].mock.calls[0][1].objeto.value).toEqual('Aquisição')
            expect(mutations[mutationTypes.LOKI.SET_LOADING_MESSAGE].mock.calls[0][1]).toBe('Carregando projetos...')
            expect(actions[actionTypes.PROJETO.BUSCAR_TODOS_PROJETOS]).toHaveBeenCalled()
            expect(wrapper.vm.filtrosInterno.objeto.value).toEqual('Aquisição')
        })

        it('Deve emitir o evento de remover o filtro da busca simples', async () => {
            wrapper = shallowMount(TodosProjetos, {
                localVue,
                store: criarStore({state, mutations, actions}),
                stubs: {
                    'az-search': '<div><button class="stub" @click="$emit(\'remove-filter\', \'objeto\')"></button></div>'
                }
            })

            wrapper.setData({
                filtrosInterno: {
                    objeto: {
                        value: 'Folha',
                        default: 'Folha de pagamento',
                        label: 'Pesquisa'
                    }
                }
            })

            wrapper.find('button[class="stub"]').trigger('click')
            await flushPromises()

            expect(mutations[mutationTypes.PROJETO.SET_FILTROS_BUSCA_TODOS_PROJETOS].mock.calls[0][1].objeto.value).toEqual('Folha de pagamento')
            expect(mutations[mutationTypes.LOKI.SET_LOADING_MESSAGE].mock.calls[0][1]).toBe('Carregando projetos...')
            expect(actions[actionTypes.PROJETO.BUSCAR_TODOS_PROJETOS]).toHaveBeenCalled()
            expect(wrapper.vm.filtrosInterno.objeto.value).toEqual('Folha de pagamento')
        })

        it('Deve emitir o evento de acessar a compra direta com a situação "Em Elaboração"', () => {
            state.loki.user.authorities = [
                {
                    hasAccess: true,
                    name: 'Comprador.Admin'
                }
            ]
            wrapper = shallowMount(TodosProjetos, {
                localVue,
                router,
                store: criarStore({state, mutations, actions}),
                stubs: {
                    TodosProjetosTabela: '<div><button class="stub" @click="$emit(\'acessar\', {id: 4, situacao: \'ABERTO\'})"></button></div>'
                }
            })

            wrapper.find('button[class="stub"]').trigger('click')
            expect(router.push.mock.calls[0][0]).toEqual({name: 'DadosGeraisEdicao', params: {id: 4}})
        })

        it('Deve emitir o evento de acessar a compra direta com qualquer situação', () => {
            wrapper = shallowMount(TodosProjetos, {
                localVue,
                router,
                store: criarStore({state, mutations, actions}),
                stubs: {
                    TodosProjetosTabela: '<div><button class="stub" @click="$emit(\'acessar\', {id: 7, situacao: \'ENCERRADO\'})"></button></div>'
                }
            })

            wrapper.find('button[class="stub"]').trigger('click')
            expect(router.push.mock.calls[0][0]).toEqual({name: 'DadosGeraisVisualizacao', params: {id: 7}})
        })

        it('Deve falhar ao buscar as informações da busca', async () => {
            actions[actionTypes.PROJETO.BUSCAR_TODOS_PROJETOS] = jest.fn().mockRejectedValueOnce(new Error('Ocorreu um erro ao realizar a operação.'))

            wrapper = shallowMount(TodosProjetos, {
                localVue,
                store: criarStore({state, mutations, actions})
            })

            await expect(wrapper.vm.buscar()).rejects.toThrow('Ocorreu um erro ao realizar a operação.')
        })
    })
})