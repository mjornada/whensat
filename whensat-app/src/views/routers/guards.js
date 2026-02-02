import { routesNames } from '@/core/constants'
import store from '@/core/store'
import { Alert } from '@/core/utils'

const alert = new Alert(store)

class RouterGuards {
	async condicoes(to, from, next) {
		this.validarPermissaoUsuario(to, from, next)
	}

	validarPermissaoUsuario(to, from, next) {
		if (to.meta.requiresAuth) {
			let possuiPermissao = false
			if (store.state.loki.user.authorities.length > 0) {
				possuiPermissao = store.state.loki.user.authorities.find((permissao) => {
					return (
						to.meta.authorities.indexOf(permissao.name) > -1 &&
						permissao.hasAccess === true
					)
				})
			}
			if (possuiPermissao) {
				next()
			} else {
				alert.showError('O seu usuário não tem acesso a esta página.')
				next({ name: routesNames.PAGINA_NAO_AUTORIZADO })
			}
		} else {
			next()
		}
	}
}

export default new RouterGuards()
