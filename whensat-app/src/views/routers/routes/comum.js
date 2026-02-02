import { routesNames } from '@/core/constants'
import NaoAutorizado from '@/views/pages/comum/nao-autorizado/NaoAutorizado'
import PaginaNaoEncontrada from '@/views/pages/comum/pagina-nao-encontrada/PaginaNaoEncontrada'
import RedirecionaEditarUsuario from '@/views/pages/comum/perfil/RedirecionaEditarUsuario'

export default [
	{
		path: '/',
		redirect: () => ({ name: routesNames.PROJETO_TODOS }),
	},
	{
		name: routesNames.REDIRECIONAR_EDITAR_USUARIO,
		path: '/perfil',
		component: RedirecionaEditarUsuario,
		meta: {
			page: {
				title: 'Redirecionando para seu perfil',
			},
		},
	},
	{
		name: routesNames.PAGINA_NAO_AUTORIZADO,
		path: '/403',
		component: NaoAutorizado,
		meta: {
			page: {
				title: 'Acesso Negado',
			},
		},
	},
	{
		name: routesNames.PAGINA_NAO_ENCONTRADA,
		path: '*',
		component: PaginaNaoEncontrada,
		meta: {
			page: {
				title: 'Oops',
				subtitle: 'Página não encontrada',
			},
		},
	},
]
