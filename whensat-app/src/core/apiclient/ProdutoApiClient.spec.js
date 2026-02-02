import produto from './ProdutoApiClient'

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

describe('ProdutoApiClient', () => {
	beforeEach(() => {
		verboHttp = ''
		url = ''
		mockRetornoApi = true
	})

	it('Deve chamar a url /hal/public/produtos', async () => {
		const produtoNome = 'teste'
		const { data } = await produto.buscarPorNome(produtoNome)

		expect(data).toBeTruthy()
		expect(verboHttp).toEqual('get')
		expect(url).toEqual(`/hal/public/produtos?produtoNome=${produtoNome}`)
	})
})
