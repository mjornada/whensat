import '@/plugins'
import filters from '@/views/filters'
import mixins from '@/views/mixins'
import Vue from 'vue'

class Register {
	registerAll() {
		Vue.use(filters)
		Vue.use(mixins)
	}
}

export default new Register()
