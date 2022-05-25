import {mount} from '@vue/test-utils'
import ExpansaoTexto from './ExpansaoTexto'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'

describe('ExpansaoTexto', () => {
    let wrapper, localVue, store

    beforeEach(() => {
        localVue = applicationTestBuilder.build()
    })

    describe('Events', () => {
        it('Deve emitir o evento de onResize ao alterar o width', () => {
            wrapper = mount(ExpansaoTexto, {
                localVue,
                store,
                propsData: {
                    texto: 'Dispensa de Licitação para contratação emergencial de empresa',
                    tamanho: 15
                }
            })

            expect(wrapper.vm.tamanhoJanela.x).toBe(1024)
            window.innerWidth = 500
            wrapper.vm.onResize()
            expect(wrapper.vm.tamanhoJanela.x).toBe(500)
        })
    })
})