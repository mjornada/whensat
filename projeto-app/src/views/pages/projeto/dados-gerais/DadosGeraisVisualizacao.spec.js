import {shallowMount} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import DadosGeraisVisualizacao from './DadosGeraisVisualizacao'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import {actionTypes, mutationTypes} from '@/core/constants'

describe('DadosGeraisVisualizacao', () => {
    let wrapper, actions, localVue, router, store, state, mutations

    const dadosGeraisObjeto = {
        id: 27
    }

    beforeEach(() => {
        localVue = applicationTestBuilder.build()

        state = {
            loki: {
                user: {
                    domainId: 1
                }
            },
            projeto: {
                dadosGerais: {}
            }
        }

        router = {
            init: jest.fn(),
            push: jest.fn(),
            replace: jest.fn(),
            history: {
                current: {
                    name: 'DadosGeraisVisualizacao',
                    params: {
                        id: dadosGeraisObjeto.id
                    }
                }
            }
        }

        mutations = {
            [mutationTypes.LOKI.SHOW_ALERT]: jest.fn()
        }

        actions = {
            [actionTypes.PROJETO.BUSCAR_DADOS_GERAIS]: jest.fn().mockReturnValue(dadosGeraisObjeto)
        }

        store = new Vuex.Store({state, mutations, actions})
    })

    describe('Mounted', () => {
        it('Deve buscar os dados do projeto', async () => {
            wrapper = shallowMount(DadosGeraisVisualizacao, {
                store,
                router,
                localVue
            })

            await flushPromises()

            expect(actions[actionTypes.PROJETO.BUSCAR_DADOS_GERAIS]).toBeDefined()
        })

        it('Não deve buscar dos dados gerais do projeto', async () => {
            actions[actionTypes.PROJETO.BUSCAR_DADOS_GERAIS] = jest.fn().mockRejectedValueOnce(new Error('Ocorreu um erro ao realizar a operação.'))

            wrapper = shallowMount(DadosGeraisVisualizacao, {
                localVue,
                store: new Vuex.Store({state, mutations, actions}),
                router
            })
            await flushPromises()

            expect(mutations[mutationTypes.LOKI.SHOW_ALERT].mock.calls[0][1]).toEqual({
                message: 'Ocorreu um erro ao realizar a operação.',
                type: 'error'
            })
        })
    })

    describe('Events', () => {
        it('Deve emitir o evento de voltar para a tela de listagem dos projetos', () => {
            state.comum = {
                rota: {
                    origem: 'TodosProjetos'
                }
            }

            wrapper = shallowMount(DadosGeraisVisualizacao, {
                store: new Vuex.Store({state, mutations, actions}),
                localVue,
                router,
                stubs: {
                    BotaoVoltar: '<div><button class="stub" @click="$emit(\'voltar\')"></button></div>'
                }
            })

            wrapper.find('button[class="stub"]').trigger('click')
            expect(router.push.mock.calls[0][0]).toEqual({name: 'TodosProjetos'})
        })

        it('Deve emitir o evento de avançar', () => {
            wrapper = shallowMount(DadosGeraisVisualizacao, {
                localVue,
                router,
                store,
                stubs: {
                    BotaoAvancar: '<div><button class="stub" @click="$emit(\'avancar\')"></button></div>'
                }
            })

            wrapper.find('button[class="stub"]').trigger('click')
            expect(router.push.mock.calls[0][0]).toEqual({name: 'TarefasVisualizacao', params: 27})
        })
    })
})