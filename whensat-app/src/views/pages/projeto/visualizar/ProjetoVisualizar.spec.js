import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Vuex from 'vuex'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import { actionTypes, mutationTypes, routesNames } from '@/core/constants'
import ProjetoVisualizar from './ProjetoVisualizar'

describe('ProjetoVisualizar', () => {
	let wrapper, actions, localVue, router, store, state, mutations

	const projetoDados = {
		id: 27,
		nome: 'Teste',
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
					name: 'ProjetoVisualizar',
					params: {
						id: projetoDados.id,
					},
				},
			},
		}

		mutations = {
			[mutationTypes.LOKI.SHOW_ALERT]: jest.fn(),
		}

		actions = {
			[actionTypes.PROJETO.BUSCAR_POR_ID]: jest.fn().mockReturnValue(projetoDados),
		}

		store = new Vuex.Store({ state, mutations, actions })
	})

	describe('Mounted', () => {
		it('Deve buscar os dados do projeto', async () => {
			wrapper = shallowMount(ProjetoVisualizar, {
				store,
				router,
				localVue,
			})

			await flushPromises()

			expect(wrapper.vm.projetoId).toEqual(projetoDados.id)
			expect(actions[actionTypes.PROJETO.BUSCAR_POR_ID]).toHaveBeenCalledTimes(1)
			expect(actions[actionTypes.PROJETO.BUSCAR_POR_ID].mock.calls[0][1]).toEqual(projetoDados.id)
		})

		it('Deve falhar ao buscar dos dados do projeto', async () => {
			actions[actionTypes.PROJETO.BUSCAR_POR_ID] = jest
				.fn()
				.mockRejectedValue(new Error('Ocorreu um erro ao realizar a operação.'))

			wrapper = shallowMount(ProjetoVisualizar, {
				localVue,
				store: new Vuex.Store({ state, mutations, actions }),
				router,
			})
			await flushPromises()

			expect(mutations[mutationTypes.LOKI.SHOW_ALERT].mock.calls[0][1]).toEqual({
				message: 'Ocorreu um erro ao realizar a operação.',
				type: 'error',
			})
		})
	})

	describe('Events', () => {
		it('Deve tratar o evento de voltar para a tela de listagem dos projetos', () => {
			wrapper = shallowMount(ProjetoVisualizar, {
				store: new Vuex.Store({ state, mutations, actions }),
				localVue,
				router,
				stubs: {
					'botao-texto': {
						template: '<button class="stub" @click="$emit(\'click\')"></button>',
					},
				},
			})

			wrapper.find('button[class="stub"]').trigger('click')
			expect(router.push.mock.calls[0][0]).toEqual({ name: routesNames.PROJETO_TODOS })
		})
	})
})
