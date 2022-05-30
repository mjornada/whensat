import api from '@/core/apiclient'
import { actionTypes, mutationTypes } from '@/core/constants'
import actions from './actions'

let state, context, retornoApiMock

describe('Actions', () => {
	beforeEach(() => {
		state = {
			loki: {
				product: {
					id: 10,
					name: 'produto',
				},
			},
			repositorioConteudo: {},
		}
		context = {
			commit: jest.fn(),
			dispatch: jest.fn(),
			state,
		}
		retornoApiMock = {
			data: 'teste',
		}
		jest.clearAllMocks()
	})

	it('Deve chamar a action COMUM.BUSCAR_PRODUTO_POR_NOME', async () => {
		api.produto.buscarPorNome = jest.fn().mockReturnValue(retornoApiMock)
		await actions[actionTypes.COMUM.BUSCAR_PRODUTO_POR_NOME](context, 'produto')

		expect(context.commit).toHaveBeenCalledWith(mutationTypes.COMUM.SET_PRODUTO, 'teste')
	})

	it('Deve chamar a action COMUM.BUSCAR_USUARIO_LOGADO', async () => {
		api.usuario.buscarLogado = jest.fn((id) => ({
			data: `usuario do produto ${id}`,
		}))
		await actions[actionTypes.COMUM.BUSCAR_USUARIO_LOGADO](context)

		expect(context.commit).toHaveBeenCalledWith(mutationTypes.COMUM.SET_USUARIO_LOGADO, 'usuario do produto 10')
	})

	it('Deve chamar a action COMUM.BUSCAR_LINK_EDITAR_USUARIO', async () => {
		api.usuario.editar = jest.fn((payload) => ({ data: payload }))
		const responseData = await actions[actionTypes.COMUM.BUSCAR_LINK_EDITAR_USUARIO](context)

		expect(responseData).toEqual({
			produto: 'produto',
			uri: 'http://localhost/',
		})
	})

	it('Deve chamar a action PROJETO.EXCLUIR', async () => {
		api.projeto.excluir = jest.fn().mockReturnValue(true)

		await actions[actionTypes.PROJETO.EXCLUIR](5)

		expect(api.projeto.excluir).toHaveBeenCalledTimes(1)
	})
})
