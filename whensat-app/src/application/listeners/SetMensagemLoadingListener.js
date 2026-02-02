import { mutationTypes } from '@/core/constants'
import store from '@/core/store'

class SetMensagemLoadingListener {
	async execute() {
		return new Promise((resolve) => {
			store.commit(mutationTypes.LOKI.SET_LOADING_MESSAGE, store.state.defaultLoadingMessage)
			resolve()
		})
	}
}

export default new SetMensagemLoadingListener()
