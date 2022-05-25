import {createLocalVue} from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueTheMask from 'vue-the-mask'
import loki from '@azinformatica/loki'
import moment from 'moment-timezone'
import {formatosDefault} from '@/core/constants'
import mixins from '@/views/mixins'

Vue.config.silent = true
Vue.config.productionTip = false

class ApplicationTestBuilder {

    constructor() {
        this.store = {}
        this.router = {}
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
        this.router = new VueRouter({routes: []})
    }

    _createVueTestInstance(store, router) {
        const localVue = createLocalVue()
        localVue.use(Vuex)

        this._createLocalVueStore(store)
        this._createLocalVueRouter(router)

        Vue.use(Vuetify)
        localVue.use(loki, {store: this.store, router: this.router})
        localVue.use(VueTheMask)
        localVue.use(mixins)
        localVue.use(VueRouter)

        this._mockDirectives(localVue)
        this._mockFilters(localVue)

        return localVue
    }

    _mockDirectives(localVue) {
        localVue.directive('az-auth', {
            inserted(el) {
                el.style.visibility = 'visible'
            }
        })

        localVue.directive('validate', {
            inserted() {
                return true
            }
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
        global.requestAnimationFrame = cb => cb()
        window.requestAnimationFrame = cb => cb()
    }

}

export default new ApplicationTestBuilder()
