import {mount, shallowMount} from '@vue/test-utils'
import Vuex from 'vuex'
import applicationTestBuilder from '@/application/ApplicationTestBuilder'
import TodosProjetosTabela from './TodosProjetosTabela'

let criarStore = ({state, getters, mutations, actions}) => {
    return new Vuex.Store({state, getters, mutations, actions})
}

describe('TodosProjetosTabela', () => {
    let wrapper, state, localVue

    beforeEach(() => {
        state = {
            loki: {
                user: {
                    domainId: 1,
                    type: 'INTERNO'
                }
            }
        }

        localVue = applicationTestBuilder.build()
    })

    describe('Events', () => {
        it('Deve emitir o evento de acessar com o id da compra direta', () => {
            wrapper = mount(TodosProjetosTabela, {
                localVue,
                store: criarStore({state}),
                propsData: {
                    itens: [
                        {
                            id: 24,
                            nome: 'Compra Direta Eletrônica 1.0',
                            descricao: 'Projeto de compra direta eletrônica para realizar disputas de licitações',
                            categoria: 'MANUTENCAO',
                            situacao: 'ABERTO'
                        }
                    ],
                    paginacao: {
                        page: 1, rowsPerPage: 10, descending: false
                    },
                    paginas: 1,
                    totalItens: 2
                },
                sync: false
            })

            const projeto = wrapper.find('table').findAll('tr').at(2)
            projeto.trigger('click')
            expect(wrapper.emitted().acessar).toBeTruthy()
            expect(wrapper.emitted().acessar[0]).toEqual([{
                'id': 24,
                'categoria': 'MANUTENCAO',
                'descricao': 'Projeto de compra direta eletrônica para realizar disputas de licitações',
                'nome': 'Compra Direta Eletrônica 1.0',
                'situacao': 'ABERTO'
            }])
        })
    })

    describe('Props', () => {
        it('Deve exibir a mensagem padrão quando não existir nenhuma compra direta', () => {
            wrapper = mount(TodosProjetosTabela, {
                localVue,
                store: criarStore({state}),
                propsData: {
                    itens: [],
                    paginacao: {
                        page: 1, rowsPerPage: 10, descending: false
                    },
                    paginas: 0,
                    totalItens: 0
                },
                sync: false
            })

            const table = wrapper.find('table')
            expect(table.html()).toContain('Não há projetos cadastrados')
        })

        it('Deve renderizar as informações na tabela', () => {
            wrapper = mount(TodosProjetosTabela, {
                localVue,
                store: criarStore({state}),
                propsData: {
                    itens: [
                        {
                            id: 23,
                            logo: 'img',
                            nome: 'Projeto de Treinamento 2.0',
                            descricao: 'Projeto de treinamento para aprender as novas tecnologias empregadas na AZ Informática',
                            categoria: 'DESENVOLVIMENTO',
                            situacao: 'ABERTO'
                        }
                    ],
                    paginacao: {
                        page: 1, rowsPerPage: 10, descending: false
                    },
                    paginas: 1,
                    totalItens: 1
                },
                sync: false
            })

            const colunastabela = wrapper.find('table').findAll('tr').at(2).findAll('td')
            expect(colunastabela.length).toEqual(5)
            expect(colunastabela.at(0).html()).toContain('Projeto de Treinamento 2.0')
            expect(colunastabela.at(1).html()).toContain('Projeto de treinamento para aprender as novas tecnologias empregadas na AZ Informática')
            expect(colunastabela.at(2).html()).toContain('Desenvolvimento')
            expect(colunastabela.at(3).html()).toContain('Aberto')
        })
    })

    describe('Watch', () => {
        it('Deve emitir o evento de paginar quando alterar a paginação', () => {
            wrapper = shallowMount(TodosProjetosTabela, {
                localVue,
                store: criarStore({state}),
                propsData: {
                    itens: [],
                    paginacao: {
                        page: 1, rowsPerPage: 10, descending: false
                    },
                    paginas: 0,
                    totalItens: 0
                }
            })

            wrapper.vm.paginacaoInterna.rowsPerPage = 16
            expect(wrapper.emitted().paginar).toBeTruthy()
        })
    })
})