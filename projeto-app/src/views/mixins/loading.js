import { mutationTypes } from '@/core/constants'
import { mapMutations } from 'vuex'

export default {
	methods: {
		desabilitarLoadingGlobal() {
			this.disableGlobalLoading()
		},
		habilitarLoadingGlobal() {
			this.enableGlobalLoading()
		},
		setMensagemLoading(mensagem) {
			this.setLoadingMessage(mensagem)
		},
		...mapMutations([
			mutationTypes.LOKI.DISABLE_GLOBAL_LOADING,
			mutationTypes.LOKI.ENABLE_GLOBAL_LOADING,
			mutationTypes.LOKI.SET_LOADING_MESSAGE,
		]),
	},
}
