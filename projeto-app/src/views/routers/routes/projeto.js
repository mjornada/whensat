import { routesNames } from '@/core/constants'
import ProjetoTodos from '@/views/pages/projeto/todos/ProjetoTodos'
import ProjetoNovo from '@/views/pages/projeto/novo/ProjetoNovo'
import ProjetoVisualizar from '@/views/pages/projeto/visualizar/ProjetoVisualizar'
import ProjetoEditar from '@/views/pages/projeto/editar/ProjetoEditar'

export default [
	{
		name: routesNames.PROJETO_TODOS,
		path: '/projetos',
		component: ProjetoTodos,
		meta: {
			menu: {
				title: 'Projetos',
				icon: 'library_books',
			},
			page: {
				title: 'Projetos',
			},
			requiresAuth: true,
			authorities: ['PerfilSistema.Projeto'],
		},
	},
	{
		name: routesNames.PROJETO_NOVO,
		path: '/projetos/novo',
		component: ProjetoNovo,
		meta: {
			page: {
				title: 'Novo Projeto',
			},
			requiresAuth: true,
			authorities: ['PerfilSistema.Projeto'],
		},
	},
	{
		name: routesNames.PROJETO_VISUALIZAR,
		path: '/projetos/:id/visualizar',
		component: ProjetoVisualizar,
		meta: {
			page: {
				title: 'Visualizar Projeto',
			},
			requiresAuth: true,
			authorities: ['PerfilSistema.Projeto'],
		},
	},
	{
		name: routesNames.PROJETO_EDITAR,
		path: '/projetos/:id/editar',
		component: ProjetoEditar,
		meta: {
			page: {
				title: 'Editar Projeto',
			},
			requiresAuth: true,
			authorities: ['PerfilSistema.Projeto'],
		},
	},
]
