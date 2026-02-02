import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

export default new Vuetify({
	icons: {
		iconfont: 'md',
	},
	lang: {
		current: 'pt',
		locales: { pt },
	},
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: '#32afa9',
				secondary: '#018383',
			},
		},
	},
})
