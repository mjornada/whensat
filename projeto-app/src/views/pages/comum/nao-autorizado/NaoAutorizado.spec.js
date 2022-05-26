import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import { shallowMount } from '@vue/test-utils'
import NaoAutorizado from './NaoAutorizado'

describe('NaoAutorizado.vue', () => {
	let localVue, wrapper

	beforeEach(() => {
		localVue = applicationTestBuilder.build()
	})

	describe('renderização', () => {
		it('Deve renderizar uma mensagem de acesso não autorizado ', () => {
			wrapper = shallowMount(NaoAutorizado, {
				localVue,
			})

			expect(wrapper.find('.mensagem-erro').find('p').text()).toEqual(
				'O seu usuário não tem acesso a esta página.',
			)
		})
	})
})
