import Vue from 'vue'
import {buildMenu} from '@azinformatica/loki'
import RootPage from '@/views/pages/RootPage.vue'
import router from '@/views/routers'
import store from '@/core/store'
import exceptionHandler from '@/core/exceptions/ExceptionHandler'

class RootPageCreator {
    createInstance() {
        new Vue({
            router,
            store,
            render: h => h(RootPage),
            created() {
                this.$store.commit('SET_MENU_ACTIONS',
                    buildMenu(store, router))
            },
            errorCaptured(error) {
                exceptionHandler.execute(error)
                return false
            }
        }).$mount('#app')
    }

    createBootstrapError() {
        new Vue({
            el: '#app',
            render(createElement) {
                return createElement('h2', 'Ocorreu um erro na inicialização desta aplicação.')
            }
        })
    }
}

export default new RootPageCreator()