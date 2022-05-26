import VeeValidate, { Validator } from 'vee-validate'
import ptBR from 'vee-validate/dist/locale/pt_BR'
import Vue from 'vue'

Vue.use(VeeValidate, {
	events: 'input|blur',
})

Validator.localize('pt_BR', ptBR)
