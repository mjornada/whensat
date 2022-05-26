import { actionTypes } from '@/core/constants'
import store from '@/core/store'

class BuscarUsuarioLogadoListener {
	async execute() {
		return await store.dispatch(actionTypes.COMUM.BUSCAR_USUARIO_LOGADO)
	}
}

export default new BuscarUsuarioLogadoListener()
