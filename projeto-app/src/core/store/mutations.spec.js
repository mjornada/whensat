import mutations from './mutations'
import {mutationTypes} from '@/core/constants'

describe('Mutations', () => {
    it('Deve chamar a mutation COMUM.SET_HABILITAR_SALVAMENTO_AUTOMATICO e atualizar o state', () => {
        const state = {
            comum: {
                salvamentoAutomatico: {}
            }
        }

        mutations[mutationTypes.COMUM.SET_HABILITAR_SALVAMENTO_AUTOMATICO](state)
        expect(state.comum.salvamentoAutomatico.salvando).toBeTruthy()
        expect(state.comum.salvamentoAutomatico.dataUltimoSalvamento).toBeNull()
    })

    it('Deve chamar a mutation COMUM.SET_DESABILITAR_SALVAMENTO_AUTOMATICO e atualizar o state', () => {
        const state = {
            comum: {
                salvamentoAutomatico: {}
            }
        }

        mutations[mutationTypes.COMUM.SET_DESABILITAR_SALVAMENTO_AUTOMATICO](state)
        expect(state.comum.salvamentoAutomatico.salvando).toBeFalsy()
        expect(state.comum.salvamentoAutomatico.dataUltimoSalvamento).not.toContain(null)
    })

    it('Deve chamar a mutation COMUM.SET_EXPANDIR_MENU e atualizar o state', () => {
        const state = {
            loki: {
                asideClosed: true
            }
        }

        mutations[mutationTypes.COMUM.SET_EXPANDIR_MENU](state)
        expect(state.loki.asideClosed).toBeFalsy()
    })

    it('Deve chamar a mutation COMUM.SET_MENU_AVATAR e atualizar o state', () => {
        const state = {
            loki: {
                user: {
                    type: 'EXTERNO'
                },
                avatarActions: {}
            }
        }

        const actions = {
            1: {title: 'Perfil', icon: 'person', path: '/perfil'}
        }

        mutations[mutationTypes.COMUM.SET_MENU_AVATAR](state)
        expect(state.loki.avatarActions).toEqual(actions)
    })

    it('Deve chamar a mutation COMUM.SET_PRODUTO e atualizar o state', () => {
        const state = {
            loki: {
                product: {}
            }
        }


        const data = {
            id: 20,
            nome: 'Compra Direta',
            atributosExtendidos: {
                logoMenu: 'logo1.png',
                logoMenuRetraido: 'logo2.png',
                logoMobile: 'logo3.png'
            }
        }

        mutations[mutationTypes.COMUM.SET_PRODUTO](state, data)
        expect(state.loki.product.id).toEqual(data.id)
        expect(state.loki.product.name).toEqual(data.nome)
        expect(state.loki.product.mainLogo).toEqual('/hal/public/arquivos?uri=logo1.png&thumbnail=false')
        expect(state.loki.product.symbolLogo).toEqual('/hal/public/arquivos?uri=logo2.png&thumbnail=false')
        expect(state.loki.product.logoMobile).toEqual('/hal/public/arquivos?uri=logo3.png&thumbnail=false')
    })

    it('Deve chamar a mutation COMUM.SET_RETRAIR_MENU e atualizar o state', () => {
        const state = {
            loki: {
                asideClosed: false
            }
        }

        mutations[mutationTypes.COMUM.SET_RETRAIR_MENU](state)
        expect(state.loki.asideClosed).toBeTruthy()
    })

    it('Deve chamar a mutation COMUM.SET_ROTA_ORIGEM e atualizar o state', () => {
        const state = {
            comum: {
                rota: {
                    origem: ''
                }
            }
        }

        mutations[mutationTypes.COMUM.SET_ROTA_ORIGEM](state, 'TarefasEdicao')
        expect(state.comum.rota.origem).toEqual('TarefasEdicao')
    })

    it('Deve chamar a mutation COMUM.SET_LINK_ARQUIVO', () => {
        const state = {
            loki: {
                file: {
                    api: ''
                }
            }
        }
        mutations[mutationTypes.COMUM.SET_LINK_ARQUIVO](state)
        expect(state.loki.file.api).toEqual('/compra-direta/api/v1/arquivos')
    })

    it('Deve chamar a mutation COMUM.SET_USUARIO_LOGADO e atualizar o state', () => {
        const state = {
            loki: {
                user: ''
            }
        }

        const usuario = {
            userId: 1,
            userName: 'Fulano',
            name: 'Fulano das Quantas',
            tipoUsuario: 'INTERNO',
            domainId: 34,
            domainName: 'teste',
            domainType: 'TESTE',
            authorities: [
                {
                    id: 78
                }
            ]
        }

        mutations[mutationTypes.COMUM.SET_USUARIO_LOGADO](state, usuario)
        expect(state.loki.user.id).toEqual(usuario.userId)
        expect(state.loki.user.name).toEqual(usuario.userName)
        expect(state.loki.user.fullName).toEqual(usuario.name)
        expect(state.loki.user.type).toEqual(usuario.tipoUsuario)
        expect(state.loki.user.domainId).toEqual(usuario.domainId)
        expect(state.loki.user.domainName).toEqual(usuario.domainName)
        expect(state.loki.user.domainType).toEqual(usuario.domainType)
        expect(state.loki.user.authorities).toEqual(usuario.authorities)
        expect(state.loki.user.photo).toEqual('')
    })

    it('Deve chamr a mutation PROJETO.SET_AUTOCOMPLETE_NOMES_DOS_PROJETOS e atualizar o state', () => {
        const projetos = ['Treinamento', 'PROJETO 2']
        const state = {
            projeto: {
                projetosValidos: []
            }
        }
        mutations[mutationTypes.PROJETO.SET_AUTOCOMPLETE_NOMES_DOS_PROJETOS](state, projetos)
        expect(state.projeto.projetosValidos).toEqual(projetos)
    })

    it('Deve chamar a mutation PROJETO.SET_REMOVER_TAREFA e atualizar o state', () => {
        const state = {
            projeto: {
                tarefas: [
                    {
                        id: 78
                    }
                ]
            }
        }
        const tarefaId = 78
        mutations[mutationTypes.PROJETO.SET_REMOVER_TAREFA](state, tarefaId)
        expect(state.projeto.tarefas.length).toEqual(0)
    })

    it('Deve chamar a mutation PROJETO.SET_REMOVER_TAREFA e não atualizar o state', () => {
        const state = {
            projeto: {
                tarefas: [
                    {
                        id: 78
                    }
                ]
            }
        }
        const tarefaId = 75
        mutations[mutationTypes.PROJETO.SET_REMOVER_TAREFA](state, tarefaId)
        expect(state.projeto.tarefas.length).toEqual(1)
    })

    it('Deve chamar a mutation PROJETO.SET_FILTROS_BUSCA_TODOS_PROJETOS e atualizar o state', () => {
        const state = {
            projeto: {
                resultadoBuscaTodosProjetos: {
                    filtros: {}
                }
            }
        }
        const filtros = {
            conteudo: 'Tarefa'
        }
        mutations[mutationTypes.PROJETO.SET_FILTROS_BUSCA_TODOS_PROJETOS](state, filtros)
        expect(state.projeto.resultadoBuscaTodosProjetos.filtros).toEqual(filtros)
    })

    it('Deve chamar a mutation PROJETO.SET_PAGINACAO_BUSCA_TODOS_PROJETOS e atualizar o state', () => {
        const state = {
            projeto: {
                resultadoBuscaTodosProjetos: {
                    paginacao: {}
                }
            }
        }
        const paginacao = {
            page: 3,
            rowsPerPage: 45,
            descending: true,
            sortBy: 'nome'
        }
        mutations[mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS_PROJETOS](state, paginacao)
        expect(state.projeto.resultadoBuscaTodosProjetos.paginacao).toEqual(paginacao)
    })

    it('Deve chamar a mutation PROJETO.SET_DADOS_GERAIS e atualizar o state', () => {
        const state = {
            projeto: {
                dadosGerais: {}
            }
        }
        const dadosGerais = {
            id: 7,
            nome: 'Projeto 1'
        }
        mutations[mutationTypes.PROJETO.SET_DADOS_GERAIS](state, dadosGerais)
        expect(state.projeto.dadosGerais).toEqual(dadosGerais)
    })

    it('Deve chamar a mutation PROJETO.SET_LIMPAR_FILTROS_BUSCA_PROJETO e atualizar o state', () => {
        const state = {
            projeto: {
                resultadoBuscaTodosProjetos: {
                    filtros: {
                        conteudo: 'Novo',
                        objeto: {
                            value: 'Tarefa 12',
                            default: null,
                            label: 'Pesquisa'
                        },
                        categoria: {
                            value: 'DESENVOLVIMENTO',
                            default: null,
                            label: 'Categoria'
                        }
                    }
                }
            }
        }
        mutations[mutationTypes.PROJETO.SET_LIMPAR_FILTROS_BUSCA_PROJETO](state)
        expect(state.projeto.resultadoBuscaTodosProjetos.filtros.conteudo).toBe('')
        expect(state.projeto.resultadoBuscaTodosProjetos.filtros.objeto).toEqual({
            value: null,
            default: null,
            label: 'Pesquisa'
        })
        expect(state.projeto.resultadoBuscaTodosProjetos.filtros.categoria).toEqual({
            value: null,
            default: null,
            label: 'Categoria'
        })
    })

    it('Deve chamar a mutation PROJETO.SET_RESUMO_DO_PROJETO e atualizar o state', () => {
        const state = {
            projeto: {
                resumoProjeto: {}
            }
        }
        const resumo = {
            id: 89,
            situacao: 'ABERTO'
        }
        mutations[mutationTypes.PROJETO.SET_RESUMO_DO_PROJETO](state, resumo)
        expect(state.projeto.resumoProjeto).toEqual(resumo)
    })

    it('Deve chamar a mutation PROJETO.SET_TAREFAS e atualizar o state', () => {
        const state = {
            projeto: {
                tarefas: []
            }
        }
        const tarefas = [
            {
                id: 73,
                nome: 'Tarefa nova'
            }
        ]
        mutations[mutationTypes.PROJETO.SET_TAREFAS](state, tarefas)
        expect(state.projeto.tarefas).toEqual(tarefas)
    })
})
