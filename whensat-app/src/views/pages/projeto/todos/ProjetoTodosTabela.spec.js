import { mount, shallowMount } from '@vue/test-utils'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import ProjetoTodosTabela from './ProjetoTodosTabela'
import flushPromises from 'flush-promises'

describe('ProjetoTodosTabela', () => {
	let wrapper, localVue, vuetify, itens, paginacao, paginas, totalItens

	beforeEach(() => {
		localVue = applicationTestBuilder.build()
		vuetify = applicationTestBuilder.getVuetify()

		itens = [
			{
				id: 1,
				nome: 'Projeto 1',
				descricao: 'Descrição do projeto',
				categoria: 'MANUTENCAO',
				situacao: 'ABERTO',
			},
		]

		paginacao = {
			page: 1,
			rowsPerPage: 10,
			descending: false,
		}

		paginas = 1

		totalItens = 1
	})

	describe('Events', () => {
		it('Deve emitir o evento de acessar com o id do projeto', () => {
			wrapper = mount(ProjetoTodosTabela, {
				localVue,
				vuetify,
				propsData: {
					itens,
					paginacao,
					paginas,
					totalItens,
				},
				sync: false,
			})

			wrapper.find('table').findAll('tr').at(1).trigger('click')

			expect(wrapper.emitted().acessar).toBeTruthy()
			expect(wrapper.emitted().acessar[0][0]).toEqual(itens[0])
		})
	})

	describe('Props', () => {
		it('Deve renderizar as informações na tabela', () => {
			wrapper = mount(ProjetoTodosTabela, {
				localVue,
				vuetify,
				propsData: {
					itens,
					paginacao,
					paginas,
					totalItens,
				},
				sync: false,
			})

			const colunastabela = wrapper.find('table').findAll('tr').at(1).findAll('td')

			expect(colunastabela.length).toEqual(5)
			expect(colunastabela.at(0).text()).toContain(itens[0].nome)
			expect(colunastabela.at(1).text()).toContain(itens[0].descricao)
			expect(colunastabela.at(2).text()).toContain('Manutenção')
			expect(colunastabela.at(3).text()).toContain('Aberto')
		})
	})

	describe('Watch', () => {
		it('Deve emitir o evento de paginar quando alterar a paginação', async () => {
			wrapper = shallowMount(ProjetoTodosTabela, {
				localVue,
				vuetify,
				propsData: {
					itens,
					paginacao,
					paginas,
					totalItens,
				},
			})

			wrapper.vm.paginacaoInterna.rowsPerPage = 16
			await flushPromises()

			expect(wrapper.emitted().paginar).toBeTruthy()
		})
	})
})
