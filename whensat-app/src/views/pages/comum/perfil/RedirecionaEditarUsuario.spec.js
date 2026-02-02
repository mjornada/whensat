import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import { actionTypes } from '@/core/constants'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import RedirecionaEditarUsuario from './RedirecionaEditarUsuario'

describe('RedirecionaEditarUsuario', () => {
	let actions, store, localVue

	const linkEditarUsuario = 'http://teste'

	beforeEach(() => {
		localVue = applicationTestBuilder.build()

		actions = {
			[actionTypes.COMUM.BUSCAR_LINK_EDITAR_USUARIO]: jest.fn().mockReturnValue(linkEditarUsuario),
		}

		store = new Vuex.Store({ actions })
	})

	describe('@created', () => {
		it('deve renderizar somente a barra de ações sem dados e sem ações', async () => {
			Object.defineProperty(window, 'location', {
				writable: true,
				value: { assign: jest.fn() },
			})

			shallowMount(RedirecionaEditarUsuario, {
				localVue,
				store,
			})

			await flushPromises()
			expect(actions[actionTypes.COMUM.BUSCAR_LINK_EDITAR_USUARIO]).toHaveBeenCalled()
			expect(window.location.assign).toHaveBeenCalledWith(linkEditarUsuario)
		})
	})
})
