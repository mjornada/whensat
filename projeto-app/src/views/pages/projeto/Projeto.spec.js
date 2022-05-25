import {mount, shallowMount} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import Projeto from './Projeto'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import {actionTypes, mutationTypes} from '@/core/constants'

describe('Projeto', () => {
    let wrapper, actions, localVue, router, store, state, mutations

    const resumoProjeto = {
        situacao: 'ABERTO'
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
                resumoProjeto: {}
            },
            comum: {
                rota: {
                    origem: 'TodosProjetos'
                }
            }
        }

        actions = {
            [actionTypes.PROJETO.BUSCAR_RESUMO_DO_PROJETO]: jest.fn().mockReturnValue(resumoProjeto)
        }

        mutations = {
            [mutationTypes.LOKI.SET_LOADING_MESSAGE]: jest.fn(),
            [mutationTypes.LOKI.SHOW_ALERT]: jest.fn(),
            [mutationTypes.COMUM.SET_EXPANDIR_MENU]: jest.fn(),
            [mutationTypes.COMUM.SET_RETRAIR_MENU]: jest.fn()
        }

        store = new Vuex.Store({state, mutations, actions})

        router = {
            routes: [],
            push: jest.fn(),
            init: jest.fn(),
            history: {
                current: {
                    name: 'Projeto',
                    params: {
                        id: 17
                    }
                }
            }
        }
    })

    describe('Created', () => {
        it('Deve buscar a projeto e renderizar a aba corretamente', async () => {
            wrapper = shallowMount(Projeto, {
                store,
                router,
                localVue
            })

            await flushPromises()

            const abasEsperadas = [
                'Dados Gerais',
                'Tarefas'
            ]

            expect(actions[actionTypes.PROJETO.BUSCAR_RESUMO_DO_PROJETO]).toHaveBeenCalled()

            abasEsperadas.forEach((label, index) => {
                expect(wrapper.findAll('v-tab-stub').at(index).text()).toContain(label)
            })
        })

        it('Deve falhar ao buscar o resumo do projeto', async () => {
            actions[actionTypes.PROJETO.BUSCAR_RESUMO_DO_PROJETO] = jest.fn().mockImplementation(() => {
                throw new Error('Ocorreu um erro ao realizar a operação.')
            })

            state = {
                projeto: {
                    resumoProjeto: {
                        id: 35,
                        situacao: 'ABERTO'
                    }
                },
                comum: {
                    rota: {
                        origem: 'OutraRota'
                    }
                }
            }

            wrapper = shallowMount(Projeto, {
                store: new Vuex.Store({state, mutations, actions}),
                localVue,
                router
            })

            await flushPromises()

            expect(mutations[mutationTypes.LOKI.SHOW_ALERT].mock.calls[0][1]).toEqual({
                message: 'Ocorreu um erro ao realizar a operação.',
                type: 'error'
            })
        })
    })

    describe('BeforeRouteUpdate', () => {
        it('Deve buscar a projeto ao trocar de aba', async () => {
            wrapper = shallowMount(Projeto, {
                store,
                router,
                localVue
            })

            const to = {
                params: {
                    id: 0
                }
            }

            const next = jest.fn()
            await flushPromises()

            wrapper.vm.$options.beforeRouteUpdate[0].call(wrapper.vm, to, null, next)
            expect(actions[actionTypes.PROJETO.BUSCAR_RESUMO_DO_PROJETO]).toHaveBeenCalled()
        })

        it('Deve falhar ao buscar o resumo da projeto', async () => {
            actions[actionTypes.PROJETO.BUSCAR_RESUMO_DO_PROJETO] = jest.fn().mockImplementation(() => {
                throw new Error('Ocorreu um erro ao realizar a operação.')
            })

            wrapper = shallowMount(Projeto, {
                store: new Vuex.Store({state, mutations, actions}),
                localVue,
                router
            })

            const to = {
                params: {
                    id: 0
                }
            }

            const next = jest.fn()
            await flushPromises()

            wrapper.vm.$options.beforeRouteUpdate[0].call(wrapper.vm, to, null, next)
            expect(mutations[mutationTypes.LOKI.SHOW_ALERT].mock.calls[0][1]).toEqual({
                message: 'Ocorreu um erro ao realizar a operação.',
                type: 'error'
            })
        })
    })

    describe('Destroyed', () => {
        it('Deve voltar a expandir o menu lateral quando sair da página', () => {
            wrapper = mount(Projeto, {
                render: null,
                store,
                router,
                localVue,
                destroyed() {
                }
            }).destroy()

            expect(mutations[mutationTypes.COMUM.SET_EXPANDIR_MENU]).toHaveBeenCalled()
        })
    })
})