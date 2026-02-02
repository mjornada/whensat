import alert from '@/views/mixins/alert'
import loading from '@/views/mixins/loading'

export default {
	install(Vue) {
		Vue.mixin(alert)
		Vue.mixin(loading)
	},
}
