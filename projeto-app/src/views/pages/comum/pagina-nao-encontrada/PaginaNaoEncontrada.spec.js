import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import { routesNames } from '@/core/constants'
import { shallowMount } from '@vue/test-utils'
import PaginaNaoEncontrada from './PaginaNaoEncontrada'

describe('PaginaNaoEncontrada.vue', () => {
	let localVue, router, wrapper

	beforeEach(() => {
		localVue = applicationTestBuilder.build()

		router = {
			history: {
				current: {
					name: routesNames.PAGINA_NAO_ENCONTRADA,
				},
			},
			init: jest.fn(),
			push: jest.fn(),
			replace: jest.fn(),
		}
	})

	describe('methods', () => {
		it('Deve redirecionar para página inicial', async () => {
			wrapper = shallowMount(PaginaNaoEncontrada, {
				localVue,
				router,
			})

			wrapper.vm.voltarParaInicio()
			expect(router.push.mock.calls[0][0]).toEqual({
				name: routesNames.INICIO,
			})
		})
	})
})
