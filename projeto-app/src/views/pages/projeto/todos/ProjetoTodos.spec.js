import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { actionTypes, mutationTypes, routesNames } from '@/core/constants'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import ProjetoTodos from './ProjetoTodos'
import flushPromises from 'flush-promises'

let criarStore = ({ state, getters, mutations, actions }) => {
	return new Vuex.Store({ state, getters, mutations, actions })
}

describe('ProjetoTodos', () => {
	let wrapper, mutations, actions, localVue, vuetify, router, state

	const projetos = {
		content: [
			{
				id: 10,
				situacao: 'ABERTO',
			},
		],
		totalElements: 1,
		totalPages: 1,
		last: true,
		first: true,
		sort: [
			{
				direction: 'DESC',
				property: 'dataHoraAbertura',
				ignoreCase: false,
				nullHandling: 'NATIVE',
				ascending: false,
				descending: true,
			},
		],
		numberOfElements: 1,
		size: 10,
		number: 0,
	}

	beforeEach(() => {
		localVue = applicationTestBuilder.build()
		vuetify = applicationTestBuilder.getVuetify()

		router = {
			init: jest.fn(),
			push: jest.fn(),
			history: { current: {} },
		}

		state = {
			loki: {
				user: {
					domainId: 1,
					type: 'INTERNO',
					authorities: [
						{
							hasAccess: true,
							name: 'Comprador.Admin',
						},
					],
				},
			},
			projeto: {
				resultadoBuscaTodosProjetos: {
					paginacao: {
						page: 0,
						rowsPerPage: 10,
						descending: false,
					},
					filtros: {
						nome: '',
						categoria: {
							value: null,
							default: null,
							label: 'Categoria',
						},
					},
				},
			},
		}

		mutations = {
			[mutationTypes.PROJETO.SET_FILTROS_BUSCAR_TODOS]: jest.fn(),
			[mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS]: jest.fn(),
			[mutationTypes.LOKI.SET_LOADING_MESSAGE]: jest.fn(),
			[mutationTypes.LOKI.SHOW_ALERT]: jest.fn(),
			[mutationTypes.SET_ROTA_ORIGEM]: jest.fn(),
		}

		actions = {
			[actionTypes.PROJETO.BUSCAR_TODOS]: jest.fn().mockReturnValue(projetos),
		}
	})

	describe('Events', () => {
		it('Deve tratar o evento de paginação', async () => {
			wrapper = shallowMount(ProjetoTodos, {
				localVue,
				vuetify,
				store: criarStore({ state, mutations, actions }),
				stubs: {
					'projeto-todos-tabela': {
						template: '<button class="stub" @click="$emit(\'paginar\', {})"></button>',
					},
				},
			})

			wrapper.find('button[class="stub"]').trigger('click')

			expect(mutations[mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS].mock.calls[0][1]).toEqual({})
			expect(actions[actionTypes.PROJETO.BUSCAR_TODOS]).toHaveBeenCalled()
		})

		it('Deve tratar o evento de acessar projeto com a situação "ABERTO"', () => {
			state.loki.user.authorities = [
				{
					hasAccess: true,
					name: 'PerfilSistema.Projeto',
				},
			]
			wrapper = shallowMount(ProjetoTodos, {
				localVue,
				vuetify,
				router,
				store: criarStore({ state, mutations, actions }),
				stubs: {
					ProjetoTodosTabela: {
						template:
							'<button class="stub" @click="$emit(\'acessar\', {id: 4, situacao: \'ABERTO\'})"></button>',
					},
				},
			})

			wrapper.find('button[class="stub"]').trigger('click')
			expect(router.push.mock.calls[0][0]).toEqual({ name: routesNames.PROJETO_EDITAR, params: { id: 4 } })
		})

		it('Deve tratar o evento de acessar projeto com situação "ENCERRADO"', () => {
			wrapper = shallowMount(ProjetoTodos, {
				localVue,
				vuetify,
				router,
				store: criarStore({ state, mutations, actions }),
				stubs: {
					ProjetoTodosTabela: {
						template:
							'<button class="stub" @click="$emit(\'acessar\', {id: 7, situacao: \'ENCERRADO\'})"></button>',
					},
				},
			})

			wrapper.find('button[class="stub"]').trigger('click')
			expect(router.push.mock.calls[0][0]).toEqual({ name: routesNames.PROJETO_VISUALIZAR, params: { id: 7 } })
		})
	})

	describe('Methods', () => {
		it('Deve acessar tela de novo projeto', () => {
			wrapper = shallowMount(ProjetoTodos, {
				localVue,
				vuetify,
				router,
				store: criarStore({ state, mutations, actions }),
			})

			wrapper.vm.tratarEventoNovoProjeto()

			expect(router.push.mock.calls[0][0]).toEqual({ name: routesNames.PROJETO_NOVO })
		})

		it('Deve realizar uma busca simples', async () => {
			wrapper = shallowMount(ProjetoTodos, {
				localVue,
				vuetify,
				store: criarStore({ state, mutations, actions }),
			})

			await wrapper.vm.tratarEventoBuscaSimples('Teste 1')
			await flushPromises()

			expect(actions[actionTypes.PROJETO.BUSCAR_TODOS]).toHaveBeenCalledTimes(2)
			expect(wrapper.vm.filtrosInterno.nome).toEqual('Teste 1')
		})

		it('Deve falhar ao buscar as informações do projeto', async () => {
			actions[actionTypes.PROJETO.BUSCAR_TODOS] = jest
				.fn()
				.mockRejectedValue(new Error('Ocorreu um erro ao realizar a operação.'))

			wrapper = shallowMount(ProjetoTodos, {
				localVue,
				vuetify,
				store: criarStore({ state, mutations, actions }),
			})

			await expect(wrapper.vm.buscar()).rejects.toThrow('Ocorreu um erro ao realizar a operação.')
		})
	})
})
