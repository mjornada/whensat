import usuario from './UsuarioApiClient'

let url, mockRetornoApi, verboHttp

jest.mock('axios', () => ({
	get(_url) {
		return new Promise((resolve) => {
			verboHttp = 'get'
			url = _url
			resolve({ data: mockRetornoApi })
		})
	},
	post(_url) {
		return new Promise((resolve) => {
			verboHttp = 'post'
			url = _url
			resolve({ data: mockRetornoApi })
		})
	},
}))

describe('UsuarioApiClient', () => {
	beforeEach(() => {
		verboHttp = ''
		url = ''
		mockRetornoApi = true
	})

	it('Deve buscar usuario logado pela url /hal/usuario/sessao?produtoId=${produtoId}', async () => {
		const produtoId = 1
		const { data } = await usuario.buscarLogado(produtoId)

		expect(data).toBeTruthy()
		expect(verboHttp).toEqual('get')
		expect(url).toEqual(`/hal/usuario/sessao?produtoId=${produtoId}`)
	})

	it('Deve editar usuario pela url /hal/editarUsuario', async () => {
		const usuarioTeste = 'teste'
		const { data } = await usuario.editar(usuarioTeste)

		expect(data).toBeTruthy()
		expect(verboHttp).toEqual('post')
		expect(url).toEqual('/hal/editarUsuario')
	})
})
