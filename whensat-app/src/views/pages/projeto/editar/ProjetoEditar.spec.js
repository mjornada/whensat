import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import ProjetoEditar from './ProjetoEditar'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import { actionTypes, mutationTypes, routesNames } from '@/core/constants'

describe('ProjetoEditar', () => {
	let wrapper, actions, localVue, router, store, state, mutations, $validator

	const errors = {
		collect: jest.fn(),
	}

	const projetoDados = {
		id: 14,
	}

	beforeEach(() => {
		localVue = applicationTestBuilder.build()

		state = {
			projeto: {
				dados: {},
			},
		}

		router = {
			init: jest.fn(),
			push: jest.fn(),
			replace: jest.fn(),
			history: {
				current: {
					name: 'ProjetoEditar',
					params: {
						id: projetoDados.id,
					},
				},
			},
		}

		mutations = {
			[mutationTypes.LOKI.DISABLE_GLOBAL_LOADING]: jest.fn(),
			[mutationTypes.LOKI.ENABLE_GLOBAL_LOADING]: jest.fn(),
			[mutationTypes.LOKI.SET_LOADING_MESSAGE]: jest.fn(),
			[mutationTypes.LOKI.SHOW_ALERT]: jest.fn(),
			['SET_UPLOADED_FILES']: jest.fn(),
		}

		actions = {
			[actionTypes.PROJETO.BUSCAR_POR_ID]: jest.fn().mockReturnValue(projetoDados),
			[actionTypes.PROJETO.EDITAR]: jest.fn(),
		}

		store = new Vuex.Store({ state, mutations, actions })

		$validator = {
			_base: {
				validateAll: jest.fn().mockReturnValue(true),
			},
		}
	})

	describe('Mounted', () => {
		it('Deve buscar os dados do projeto', async () => {
			shallowMount(ProjetoEditar, {
				store,
				router,
				localVue,
				mocks: {
					errors,
				},
			})
			await flushPromises()

			expect(actions[actionTypes.PROJETO.BUSCAR_POR_ID]).toHaveBeenCalledTimes(1)
			expect(actions[actionTypes.PROJETO.BUSCAR_POR_ID].mock.calls[0][1]).toEqual(projetoDados.id)
		})

		it('Deve falhar ao buscar os dados do projeto', async () => {
			actions[actionTypes.PROJETO.BUSCAR_POR_ID] = jest
				.fn()
				.mockRejectedValue(new Error('Ocorreu um erro ao realizar a operação.'))

			wrapper = shallowMount(ProjetoEditar, {
				store: new Vuex.Store({ state, mutations, actions }),
				router,
				localVue,
				mocks: {
					errors,
				},
			})
			await flushPromises()

			expect(mutations[mutationTypes.LOKI.SHOW_ALERT].mock.calls[0][1]).toEqual({
				message: 'Ocorreu um erro ao realizar a operação.',
				type: 'error',
			})
		})
	})

	describe('Events', () => {
		it('Deve tratar o evento salvar projeto com sucesso', async () => {
			wrapper = shallowMount(ProjetoEditar, {
				localVue,
				store,
				router,
				stubs: {
					'botao-primario': {
						template: '<button class="stub" @click="$emit(\'click\')"></button>',
					},
				},
				mocks: {
					$validator,
					errors,
				},
			})

			wrapper.find('button[class="stub"').trigger('click')
			await flushPromises()

			expect($validator._base.validateAll).toHaveBeenCalledTimes(1)
			expect(actions[actionTypes.PROJETO.EDITAR]).toHaveBeenCalled()
			expect(mutations[mutationTypes.LOKI.SHOW_ALERT]).toHaveBeenCalled()
		})

		it('Deve falhar ao tratar o evento de salvar', async () => {
			$validator._base.validateAll = jest.fn().mockReturnValue(false)

			wrapper = shallowMount(ProjetoEditar, {
				localVue,
				store,
				router,
				stubs: {
					'botao-primario': {
						template: '<button class="stub" @click="$emit(\'click\')"></button>',
					},
				},
				mocks: {
					$validator,
					errors,
				},
			})

			await expect(wrapper.vm.tratarEventoSalvarEAvancar()).rejects.toThrow('Preencha os campos obrigatórios.')
			expect(actions[actionTypes.PROJETO.EDITAR]).not.toHaveBeenCalled()
		})

		it('Deve emitir o evento de voltar com sucesso', () => {
			wrapper = shallowMount(ProjetoEditar, {
				store: new Vuex.Store({ state, actions, mutations }),
				localVue,
				router,
				stubs: {
					'botao-texto': {
						template: '<button class="stub" @click="$emit(\'click\')"></button>',
					},
				},
				mocks: {
					errors,
				},
			})

			wrapper.find('button[class="stub"]').trigger('click')

			expect(router.push.mock.calls[0][0]).toEqual({ name: routesNames.PROJETO_TODOS })
		})
	})
})
