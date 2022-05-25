import {shallowMount} from '@vue/test-utils'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import NovaTarefa from './NovaTarefa'
import Vuex from 'vuex'
import {mutationTypes} from '@/core/constants'

describe('NovaTarefa', () => {
    let wrapper, localVue, store, $validator, state, mutations, actions, router

    const errors = {
        collect: jest.fn()
    }

    beforeEach(() => {
        localVue = applicationTestBuilder.build()

        state = {
            loki: {
                asideClosed: true
            }
        }

        mutations = {
            [mutationTypes.LOKI.DISABLE_GLOBAL_LOADING]: jest.fn(),
            [mutationTypes.LOKI.ENABLE_GLOBAL_LOADING]: jest.fn(),
            [mutationTypes.LOKI.SET_LOADING_MESSAGE]: jest.fn(),
            [mutationTypes.LOKI.SHOW_ALERT]: jest.fn()
        }

        router = {
            init: jest.fn(),
            push: jest.fn(),
            history: {current: {}}
        }

        store = new Vuex.Store({state, mutations, actions})

        $validator = {
            _base: {
                validateAll: jest.fn().mockReturnValue(true)
            }
        }
    })

    describe('Events', () => {
        it('Deve exibir o modal com sucesso', () => {
            wrapper = shallowMount(NovaTarefa, {
                localVue,
                store,
                mocks: {
                    $validator,
                    errors
                }
            })

            expect(wrapper.vm.mostrarModalNovaTarefa).toBeFalsy()
            wrapper.vm.exibirModalNovaTarefa()
            expect(wrapper.vm.mostrarModalNovaTarefa).toBeTruthy()
        })

        it('Deve fechar o modal com sucesso', () => {
            wrapper = shallowMount(NovaTarefa, {
                localVue,
                store,
                mocks: {
                    $validator,
                    errors
                }
            })

            wrapper.setData({
                mostrarModalNovaTarefa: true
            })

            expect(wrapper.vm.mostrarModalNovaTarefa).toBeTruthy()
            wrapper.vm.fecharModalNovaTarefa()
            expect(wrapper.vm.mostrarModalNovaTarefa).toBeFalsy()
        })
    })
})