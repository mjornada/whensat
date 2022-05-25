export default {
    comum: {
        rota: {
            origem: 'Inicial'
        },
        salvamentoAutomatico: {
            salvando: false
        }
    },
    projeto: {
        dadosGerais: {},
        projetosValidos: [],
        resultadoBuscaTodosProjetos: {
            paginacao: {
                page: 1,
                rowsPerPage: 10,
                descending: false,
                sortBy: 'dataHoraFinal'
            },
            filtros: {
                conteudo: '',
                objeto: {
                    value: null,
                    default: null,
                    label: 'Pesquisa'
                },
                categoria: {
                    value: null,
                    default: null,
                    label: 'Categoria'
                }
            }
        },
        resumoProjeto: {},
        tarefas: []
    }
}