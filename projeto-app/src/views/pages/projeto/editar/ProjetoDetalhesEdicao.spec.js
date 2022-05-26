import {shallowMount} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import DadosGeraisEdicao from './DadosGeraisEdicao'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import {actionTypes, mutationTypes} from '@/core/constants'

describe('DadosGeraisEdicao', () => {
    let wrapper, actions, localVue, router, store, state, mutations, $validator

    const errors = {
        collect: jest.fn()
    }

    const dadosGeraisObjeto = {
        id: 14
    }

    beforeEach(() => {
        localVue = applicationTestBuilder.build()

        state = {
            loki: {
                user: {
                    domainId: 1
                },
                uploadedFiles: []
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
                    name: 'DadosGeraisEdicao',
                    params: {
                        id: dadosGeraisObjeto.id
                    }
                }
            }
        }

        mutations = {
            [mutationTypes.LOKI.DISABLE_GLOBAL_LOADING]: jest.fn(),
            [mutationTypes.LOKI.ENABLE_GLOBAL_LOADING]: jest.fn(),
            [mutationTypes.LOKI.SET_LOADING_MESSAGE]: jest.fn(),
            [mutationTypes.LOKI.SHOW_ALERT]: jest.fn(),
            ['SET_UPLOADED_FILES']: jest.fn()
        }

        actions = {
            [actionTypes.PROJETO.BUSCAR_DADOS_GERAIS]: jest.fn().mockReturnValue(dadosGeraisObjeto),
            [actionTypes.PROJETO.SALVAR_DADOS_GERAIS]: jest.fn()
        }

        store = new Vuex.Store({state, mutations, actions})

        $validator = {
            _base: {
                validateAll: jest.fn().mockReturnValue(true)
            }
        }
    })

    describe('Mounted', () => {
        it('Deve buscar os dados do projeto', async () => {
            shallowMount(DadosGeraisEdicao, {
                store,
                router,
                localVue,
                mocks: {
                    errors
                }
            })

            await flushPromises()

            expect(actions[actionTypes.PROJETO.BUSCAR_DADOS_GERAIS]).toBeDefined()
        })

        it('Deve falhar ao buscar os dados gerais', async () => {
            actions[actionTypes.PROJETO.BUSCAR_DADOS_GERAIS] = jest.fn().mockRejectedValueOnce(new Error('Ocorreu um erro ao realizar a operação.'))

            wrapper = shallowMount(DadosGeraisEdicao, {
                store: new Vuex.Store({state, mutations, actions}),
                router,
                localVue,
                mocks: {
                    errors
                }
            })

            await flushPromises()

            expect(mutations[mutationTypes.LOKI.SHOW_ALERT].mock.calls[0][1]).toEqual({
                message: 'Ocorreu um erro ao realizar a operação.',
                type: 'error'
            })
        })
    })

    describe('BeforeRouteLeave', () => {
        it('Deve ir para a tela de listagem ao deixar a aba', () => {
            wrapper = shallowMount(DadosGeraisEdicao, {
                store,
                router,
                localVue,
                mocks: {
                    errors
                }
            })

            state.comum = {
                rota: {
                    origem: 'TodosProjetos'
                }
            }

            const next = jest.fn()
            wrapper.vm.$options.beforeRouteLeave[0].call(wrapper.vm, {name: 'TodosProjetos'}, null, next)
            expect(next).toHaveBeenCalled()
        })
    })

    describe('Events', () => {
        xit('Deve emitir o evento de salvar os dados do projeto com sucesso', async () => {
            wrapper = shallowMount(DadosGeraisEdicao, {
                localVue,
                store,
                router,
                stubs: {
                    BotaoSalvar: '<div><button class="stub" @click="$emit(\'salvar\')"></button></div>'
                },
                mocks: {
                    $validator,
                    errors
                }
            })

            wrapper.find('button[class="stub"').trigger('click')
            await flushPromises()

            const dadosGerais = Object.assign({}, wrapper.vm.dadosGerais)

            expect(mutations[mutationTypes.LOKI.SET_LOADING_MESSAGE].mock.calls[0][1]).toBe('Salvando o projeto...')
            expect(actions[actionTypes.PROJETO.SALVAR_DADOS_GERAIS].mock.calls[0][1]).toEqual(dadosGerais)
            expect(mutations[mutationTypes.LOKI.SHOW_ALERT]).toHaveBeenCalled()
        })

        it('Deve falhar ao emitir o evento de salvar e avançar com os campos obrigatórios', async () => {
            $validator._base.validateAll = jest.fn().mockReturnValue(false)

            wrapper = shallowMount(DadosGeraisEdicao, {
                localVue,
                store,
                router,
                stubs: {
                    BotaoSalvarAvancar: '<div><button class="stub" @click="$emit(\'salvarEAvancar\')"></button></div>'
                },
                mocks: {
                    $validator,
                    errors
                }
            })

            await expect(wrapper.vm.tratarEventoSalvarEAvancar()).rejects.toThrow('Preencha os campos obrigatórios.')
            expect(actions[actionTypes.PROJETO.SALVAR_DADOS_GERAIS]).not.toHaveBeenCalled()
        })

        it('Deve emitir o evento de salvar e avançar os dados do projeto com sucesso', async () => {
            wrapper = shallowMount(DadosGeraisEdicao, {
                localVue,
                store,
                router,
                stubs: {
                    BotaoSalvarAvancar: '<div><button class="stub" @click="$emit(\'salvarEAvancar\')"></button></div>'
                },
                mocks: {
                    $validator,
                    errors
                }
            })

            await flushPromises()

            wrapper.vm.dadosGerais.tipo = 'Sem Disputa'
            wrapper.vm.dadosGerais.nomeContato = 'Thalita'
            wrapper.vm.dadosGerais.nomeTelefone = '232423333'
            wrapper.vm.dadosGerais.prazoEntrega = '60'
            wrapper.vm.dadosGerais.localEntrega = 'DETRAN'
            wrapper.vm.dadosGerais.exibeValorReferencia = false
            wrapper.vm.dadosGerais.dataHoraAbertura = new Date('2018-02-05T12:00:00')
            wrapper.vm.dadosGerais.dataHoraEncerramento = new Date('2018-02-10T12:00:00')

            wrapper.find('button[class="stub"').trigger('click')
            await flushPromises()

            const dadosGerais = Object.assign({}, wrapper.vm.dadosGerais)

            expect(mutations[mutationTypes.LOKI.SET_LOADING_MESSAGE].mock.calls[0][1]).toBe('Salvando o projeto...')
            expect(actions[actionTypes.PROJETO.SALVAR_DADOS_GERAIS].mock.calls[0][1]).toEqual(dadosGerais)
            expect(mutations[mutationTypes.LOKI.SHOW_ALERT]).toHaveBeenCalled()
        })

        it('Deve emitir o evento de voltar com sucesso', () => {
            state.comum = {
                rota: {
                    origem: 'TodosProjetos'
                }
            }

            wrapper = shallowMount(DadosGeraisEdicao, {
                store: new Vuex.Store({state, actions, mutations}),
                localVue,
                router,
                stubs: {
                    BotaoVoltar: '<div><button class="stub" @click="$emit(\'voltar\')"></button></div>'
                },
                mocks: {
                    errors
                }
            })

            wrapper.find('button[class="stub"]').trigger('click')
            expect(router.push.mock.calls[0][0]).toEqual({name: 'TodosProjetos'})
        })
    })
})
