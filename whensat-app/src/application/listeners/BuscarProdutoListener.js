import { actionTypes } from '@/core/constants'
import store from '@/core/store'

class BuscarProdutoListener {
	async execute() {
		return await store.dispatch(actionTypes.COMUM.BUSCAR_PRODUTO_POR_NOME)
	}
}

export default new BuscarProdutoListener()
