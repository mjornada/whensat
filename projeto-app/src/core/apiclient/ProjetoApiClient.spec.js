import projeto from './ProjetoApiClient'

let url, mockRetornoApi, verboHttp

jest.mock('axios', () => ({
	get(_url) {
		return new Promise((resolve) => {
			verboHttp = 'get'
			url = _url
			resolve({ data: mockRetornoApi })
		})
	},
}))

describe('ProjetoApiClient', () => {
	beforeEach(() => {
		verboHttp = ''
		url = ''
		mockRetornoApi = true
	})

	it('Deve chamar a url /projeto/api/projetos', async () => {
		const filtros = {}
		const paginacao = {
			page: 1,
			rowsPerPage: 10,
		}
		const { data } = await projeto.buscarTodos(filtros, paginacao)

		expect(data).toBeTruthy()
		expect(verboHttp).toEqual('get')
		expect(url).toEqual(`/projeto/api/projetos?page=${paginacao.page}&rowsPerPage=${paginacao.rowsPerPage}&`)
	})
})
