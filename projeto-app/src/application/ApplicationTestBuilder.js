import { formatosDefault } from '@/core/constants'
import filters from '@/views/filters'
import mixins from '@/views/mixins'
import loki from '@azinformatica/loki'
import { createLocalVue } from '@vue/test-utils'
import moment from 'moment-timezone'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTheMask from 'vue-the-mask'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.config.silent = true
Vue.config.productionTip = false

class ApplicationTestBuilder {
	constructor() {
		this.store = {}
		this.router = {}
		this.vuetify = {}
	}

	build(store, router) {
		this._addElemWithDataAppToBody()
		this._stubRequestAnimationFrame()

		return this._createVueTestInstance(store, router)
	}

	getStore() {
		return this.store
	}

	getRouter() {
		return this.store
	}

	getVuetify() {
		return this.vuetify
	}

	_addElemWithDataAppToBody() {
		const app = document.createElement('div')
		app.setAttribute('data-app', true)
		document.body.append(app)
	}

	_createLocalVueStore(store) {
		if (store) {
			this.store = new Vuex.Store(store)
		}
		this.store = new Vuex.Store({})
	}

	_createLocalVueRouter(router) {
		if (router) {
			this.router = router
		}
		this.router = new VueRouter({ routes: [] })
	}

	_createLocalVuetify(vuetify) {
		if (vuetify) {
			this.vuetify = vuetify
		}
		this.vuetify = new Vuetify({})
	}

	_createVueTestInstance(store, router, vuetify) {
		const localVue = createLocalVue()
		localVue.use(Vuex)

		this._createLocalVueStore(store)
		this._createLocalVueRouter(router)
		this._createLocalVuetify(vuetify)

		Vue.use(Vuetify)
		localVue.use(loki, { router: this.router, store: this.store })
		localVue.use(VueTheMask)
		localVue.use(Vuetify)
		localVue.use(mixins)
		localVue.use(filters)
		localVue.use(VueRouter)

		this._mockDirectives(localVue)
		this._mockFilters(localVue)

		return localVue
	}

	_mockDirectives(localVue) {
		localVue.directive('az-auth', {
			inserted(el) {
				el.style.visibility = 'visible'
			},
		})

		localVue.directive('validate', {
			inserted() {
				return true
			},
		})
	}

	_mockFilters(localVue) {
		localVue.filter('az-date', (date, format) => {
			let dateFormat = formatosDefault.DATA
			if (format) {
				dateFormat = format
			}
			if (date) {
				return moment(date).tz('America/Sao_Paulo').format(dateFormat)
			}
			return '-'
		})
	}

	_stubRequestAnimationFrame() {
		global.requestAnimationFrame = (cb) => cb()
		window.requestAnimationFrame = (cb) => cb()
	}
}

export default new ApplicationTestBuilder()
