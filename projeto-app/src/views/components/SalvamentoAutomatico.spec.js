import {mount} from '@vue/test-utils'
import SalvamentoAutomatico from './SalvamentoAutomatico'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import Vuex from 'vuex'

let criarStore = ({state, getters, mutations, actions}) => {
    return new Vuex.Store({state, getters, mutations, actions})
}

describe('SalvamentoAutomatico', () => {
    let wrapper, localVue, state

    beforeEach(() => {
        localVue = applicationTestBuilder.build()

        state = {
            comum: {
                salvamentoAutomatico: {
                    salvando: false
                }
            }
        }
    })

    describe('Renderização', () => {
        it('Deve exibir o tooltip vazio', () => {
            wrapper = mount(SalvamentoAutomatico, {
                localVue,
                store: criarStore({state})
            })

            expect(wrapper.find('.v-tooltip').find('span').text()).not.toContain('Salvo')
        })

        it('Deve exibir o texto "Salvando"', () => {
            state.comum = {
                salvamentoAutomatico: {
                    salvando: true
                }
            }

            wrapper = mount(SalvamentoAutomatico, {
                localVue,
                store: criarStore({state})
            })

            expect(wrapper.find('.v-tooltip').find('span').text()).toContain('Salvando...')
        })

        it('Deve exibir o texto "Salvo Automaticamente"', () => {
            state.comum = {
                salvamentoAutomatico: {
                    salvando: false,
                    dataUltimoSalvamento: new Date()
                }
            }

            wrapper = mount(SalvamentoAutomatico, {
                localVue,
                store: criarStore({state})
            })

            expect(wrapper.find('.v-tooltip').find('span').text()).toContain('Salvo Automaticamente')
            expect(wrapper.findAll('span').at(1).text()).toContain('Salvo a few seconds ago atrás')
        })
    })
})