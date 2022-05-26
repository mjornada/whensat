import { mutationTypes, produto } from '@/core/constants'
import FileManagerUtils from '@/core/utils/FileManagerUtils'
import Vue from 'vue'

export default {
	[mutationTypes.COMUM.SET_PRODUTO](state, data) {
		state.loki.product.id = data.id
		state.loki.product.name = data.nome
		state.loki.product.mainLogo = FileManagerUtils.createUrl(data.atributosExtendidos.logoMenu)
		state.loki.product.symbolLogo = FileManagerUtils.createUrl(data.atributosExtendidos.logoMenuRetraido)
		state.loki.product.logoMobile = FileManagerUtils.createUrl(data.atributosExtendidos.logoMobile)
		state.loki.product.version = produto.VERSAO
		state.loki.product.copywrite = produto.COPYRIGHT
	},

	[mutationTypes.COMUM.SET_RETRAIR_MENU](state) {
		Vue.set(state.loki, 'asideClosed', true)
	},

	[mutationTypes.COMUM.SET_USUARIO_LOGADO](state, usuario) {
		const user = {
			authorities: usuario.authorities,
			domainId: usuario.domainId,
			domainName: usuario.domainName,
			domainType: usuario.domainType,
			fullName: usuario.name,
			id: usuario.userId,
			name: usuario.userName,
			photo: FileManagerUtils.createThumbnailUrl(usuario.imageUrl),
			type: usuario.tipoUsuario,
		}
		Vue.set(state.loki, 'user', user)
	},

	[mutationTypes.COMUM.SET_MENU_AVATAR](state) {
		const actions = {
			1: { icon: 'person', path: '/perfil', title: 'Perfil' },
		}
		Vue.set(state.loki, 'avatarActions', actions)
	},

	[mutationTypes.COMUM.SET_EXPANDIR_MENU](state) {
		Vue.set(state.loki, 'asideClosed', false)
	},

	[mutationTypes.COMUM.SET_ROTA_ORIGEM](state, rota) {
		Vue.set(state.comum.rota, 'origem', rota)
	},

	[mutationTypes.COMUM.SET_LINK_ARQUIVO](state) {
		Vue.set(state.loki.file, 'api', produto.LINK_ARQUIVO)
	},

	[mutationTypes.PROJETO.SET_FILTROS_BUSCAR_TODOS](state, filtros) {
		state.projeto.resultadoBuscaTodosProjetos.filtros = filtros
	},

	[mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS](state, paginacao) {
		state.projeto.resultadoBuscaTodosProjetos.paginacao = paginacao
	},

	[mutationTypes.PROJETO.SET_LIMPAR_FILTROS_BUSCAR_TODOS](state) {
		state.projeto.resultadoBuscaTodosProjetos.filtros = {
			nome: '',
			categoria: {
				value: null,
				default: null,
				label: 'Categoria',
			},
		}
	},

	[mutationTypes.PROJETO.SET_DADOS_PROJETO](state, dados) {
		state.projeto.dados = dados
	},
}
