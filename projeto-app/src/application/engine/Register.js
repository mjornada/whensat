import Vue from 'vue'
import mixins from '@/views/mixins'
import '@/plugins'

class Register {

    registerAll() {
        Vue.use(mixins)
    }

}

export default new Register()
