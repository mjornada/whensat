export default {
	comum: {
		rota: {
			origem: 'Inicial',
		},
	},
	defaultLoadingMessage: 'Carregando...',
	projeto: {
		dados: {},
		projetosValidos: [],
		resultadoBuscaTodosProjetos: {
			paginacao: {
				page: 1,
				rowsPerPage: 10,
				descending: false,
				sortBy: ['situacao'],
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
		resumoProjeto: {},
		tarefas: [],
	},
}
