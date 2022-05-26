import { mutationTypes, notificacoesDefault } from '@/core/constants'

export default class Alert {
	constructor(store) {
		this.store = store
	}

	showError(key) {
		if (!key) {
			key = notificacoesDefault.ERRO_DEFAULT
		}
		this.store.commit(mutationTypes.LOKI.SHOW_ALERT, {
			message: key,
			type: 'error',
		})
	}

	showSuccess(key) {
		if (!key) {
			key = notificacoesDefault.SUCESSO_DEFAULT
		}
		this.store.commit(mutationTypes.LOKI.SHOW_ALERT, {
			message: key,
			type: 'success',
		})
	}
}
