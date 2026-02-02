import { mutationTypes } from '@/core/constants'
import exceptionHandler from '@/core/exceptions/ExceptionHandler'
import store from '@/core/store'
import vuetify from '@/plugins/vuetify'
import RootPage from '@/views/pages/RootPage.vue'
import router from '@/views/routers'
import { buildMenu } from '@azinformatica/loki'
import Vue from 'vue'

class RootPageCreator {
	createInstance() {
		new Vue({
			router,
			store,
			vuetify,
			created() {
				this.$store.commit(mutationTypes.LOKI.SET_MENU_ACTIONS, buildMenu(store, router))
			},
			errorCaptured(error) {
				exceptionHandler.execute(error)
				return false
			},
			render: (h) => h(RootPage),
		}).$mount('#app')
	}

	createBootstrapError() {
		new Vue({
			el: '#app',
			render(createElement) {
				return createElement(
					'div',
					{
						class: 'projeto__erro-inicializacao',
					},
					[
						createElement('div', {}, [
							createElement('i', {
								class: 'far fa-frown',
							}),
							createElement('p', 'Ocorreu um erro na inicialização desta aplicação.'),
						]),
					],
				)
			},
		})
	}
}

export default new RootPageCreator()
