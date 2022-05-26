import { mutationTypes } from '@/core/constants'
import mutations from './mutations'

describe('Mutations', () => {
	it('Deve chamar a mutation COMUM.SET_EXPANDIR_MENU e atualizar o state', () => {
		const state = {
			loki: {
				asideClosed: true,
			},
		}

		mutations[mutationTypes.COMUM.SET_EXPANDIR_MENU](state)
		expect(state.loki.asideClosed).toBeFalsy()
	})

	it('Deve chamar a mutation COMUM.SET_LINK_ARQUIVO e atualizar o state', () => {
		const state = {
			loki: {
				file: {},
			},
		}

		mutations[mutationTypes.COMUM.SET_LINK_ARQUIVO](state)
		expect(state.loki.file.api).toEqual('/api')
	})

	it('Deve chamar a mutation COMUM.SET_MENU_AVATAR e atualizar o state para tipo "Externo"', () => {
		const state = {
			loki: {
				avatarActions: {},
				user: {
					type: 'EXTERNO',
				},
			},
		}

		const actions = {
			1: { icon: 'person', path: '/perfil', title: 'Perfil' },
		}

		mutations[mutationTypes.COMUM.SET_MENU_AVATAR](state)
		expect(state.loki.avatarActions).toEqual(actions)
	})

	it('Deve chamar a mutation COMUM.SET_MENU_AVATAR e atualizar o state para tipo "Interno"', () => {
		const state = {
			loki: {
				avatarActions: {},
				user: {
					type: 'INTERNO',
				},
			},
		}

		const actions = {
			1: { icon: 'person', path: '/perfil', title: 'Perfil' },
		}

		mutations[mutationTypes.COMUM.SET_MENU_AVATAR](state)
		expect(state.loki.avatarActions).toEqual(actions)
	})

	it('Deve chamar a mutation COMUM.SET_PRODUTO e atualizar o state', () => {
		const state = {
			loki: {
				product: {},
			},
		}

		const data = {
			atributosExtendidos: {
				logoMenu: 'logo1.png',
				logoMenuRetraido: 'logo2.png',
				logoMobile: 'logo3.png',
			},
			id: 20,
			nome: 'produto',
		}

		mutations[mutationTypes.COMUM.SET_PRODUTO](state, data)
		expect(state.loki.product.id).toEqual(data.id)
		expect(state.loki.product.name).toEqual(data.nome)
		expect(state.loki.product.mainLogo).toEqual('/hal/public/arquivos?uri=logo1.png&thumbnail=false')
		expect(state.loki.product.symbolLogo).toEqual('/hal/public/arquivos?uri=logo2.png&thumbnail=false')
		expect(state.loki.product.logoMobile).toEqual('/hal/public/arquivos?uri=logo3.png&thumbnail=false')
	})

	it('Deve chamar a mutation COMUM.SET_RETRAIR_MENU e atualizar o state', () => {
		const state = {
			loki: {
				asideClosed: false,
			},
		}

		mutations[mutationTypes.COMUM.SET_RETRAIR_MENU](state)
		expect(state.loki.asideClosed).toBeTruthy()
	})

	it('Deve chamar a mutation COMUM.SET_ROTA_ORIGEM e atualizar o state', () => {
		const state = {
			comum: {
				rota: {
					origem: '',
				},
			},
		}

		mutations[mutationTypes.COMUM.SET_ROTA_ORIGEM](state, 'RotaOrigemTeste')
		expect(state.comum.rota.origem).toEqual('RotaOrigemTeste')
	})

	it('Deve chamar a mutation COMUM.SET_USUARIO_LOGADO e atualizar o state', () => {
		const state = {
			loki: {
				user: '',
			},
		}

		const usuario = {
			authorities: [
				{
					id: 78,
				},
			],
			domainId: 34,
			domainName: 'teste',
			domainType: 'TESTE',
			name: 'Fulano das Quantas',
			tipoUsuario: 'INTERNO',
			userId: 1,
			userName: 'Fulano',
		}

		mutations[mutationTypes.COMUM.SET_USUARIO_LOGADO](state, usuario)

		expect(state.loki.user.id).toEqual(usuario.userId)
		expect(state.loki.user.name).toEqual(usuario.userName)
		expect(state.loki.user.fullName).toEqual(usuario.name)
		expect(state.loki.user.type).toEqual(usuario.tipoUsuario)
		expect(state.loki.user.domainId).toEqual(usuario.domainId)
		expect(state.loki.user.domainName).toEqual(usuario.domainName)
		expect(state.loki.user.domainType).toEqual(usuario.domainType)
		expect(state.loki.user.authorities).toEqual(usuario.authorities)
		expect(state.loki.user.photo).toEqual('')
	})
})
