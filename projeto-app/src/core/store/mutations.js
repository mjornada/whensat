import Vue from 'vue'
import {mutationTypes, produto} from '@/core/constants'
import FileManagerUtils from '@/core/utils/FileManagerUtils'

export default {

    [mutationTypes.COMUM.SET_PRODUTO](state, data) {
        state.loki.product.id = data.id
        state.loki.product.name = data.nome
        state.loki.product.mainLogo = FileManagerUtils.createUrl(data.atributosExtendidos.logoMenu)
        state.loki.product.symbolLogo = FileManagerUtils.createUrl(data.atributosExtendidos.logoMenuRetraido)
        state.loki.product.logoMobile = FileManagerUtils.createUrl(data.atributosExtendidos.logoMobile)
        state.loki.product.version = produto.VERSAO
        state.loki.product.copywrite = produto.COPYRIGHT
        state.loki.product.logoutUrl = produto.LOGOUT_URL
    },

    [mutationTypes.COMUM.SET_RETRAIR_MENU](state) {
        Vue.set(state.loki, 'asideClosed', true)
    },

    [mutationTypes.COMUM.SET_USUARIO_LOGADO](state, usuario) {
        const user = {
            id: usuario.userId,
            name: usuario.userName,
            fullName: usuario.name,
            photo: FileManagerUtils.createThumbnailUrl(usuario.imageUrl),
            type: usuario.tipoUsuario,
            domainId: usuario.domainId,
            domainName: usuario.domainName,
            domainType: usuario.domainType,
            authorities: usuario.authorities
        }
        Vue.set(state.loki, 'user', user)
    },

    [mutationTypes.COMUM.SET_MENU_AVATAR](state) {
        const actions = {
            1: {title: 'Perfil', icon: 'person', path: '/perfil'}
        }
        Vue.set(state.loki, 'avatarActions', actions)
    },

    [mutationTypes.COMUM.SET_HABILITAR_SALVAMENTO_AUTOMATICO](state) {
        Vue.set(state.comum.salvamentoAutomatico, 'salvando', true)
        Vue.set(state.comum.salvamentoAutomatico, 'dataUltimoSalvamento', null)
    },

    [mutationTypes.COMUM.SET_EXPANDIR_MENU](state) {
        Vue.set(state.loki, 'asideClosed', false)
    },

    [mutationTypes.COMUM.SET_DESABILITAR_SALVAMENTO_AUTOMATICO](state) {
        Vue.set(state.comum.salvamentoAutomatico, 'salvando', false)
        Vue.set(state.comum.salvamentoAutomatico, 'dataUltimoSalvamento', new Date())
    },

    [mutationTypes.COMUM.SET_ROTA_ORIGEM](state, rota) {
        Vue.set(state.comum.rota, 'origem', rota)
    },

    [mutationTypes.COMUM.SET_LINK_ARQUIVO](state) {
        Vue.set(state.loki.file, 'api', '/compra-direta/api/v1/arquivos')
    },

    [mutationTypes.PROJETO.SET_AUTOCOMPLETE_NOMES_DOS_PROJETOS](state, projetos) {
        Vue.set(state.projeto, 'projetosValidos', projetos)
    },

    [mutationTypes.PROJETO.SET_REMOVER_TAREFA](state, tarefaId) {
        const index = state.projeto.tarefas.findIndex(tar => tar.id === tarefaId)
        if (index !== -1)
            state.projeto.tarefas.splice(index, 1)
    },

    [mutationTypes.PROJETO.SET_FILTROS_BUSCA_TODOS_PROJETOS](state, filtros) {
        state.projeto.resultadoBuscaTodosProjetos.filtros = filtros
    },

    [mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS_PROJETOS](state, paginacao) {
        state.projeto.resultadoBuscaTodosProjetos.paginacao = paginacao
    },

    [mutationTypes.PROJETO.SET_DADOS_GERAIS](state, dadosGerais) {
        state.projeto.dadosGerais = dadosGerais
    },

    [mutationTypes.PROJETO.SET_LIMPAR_FILTROS_BUSCA_PROJETO](state) {
        state.projeto.resultadoBuscaTodosProjetos.filtros = {
            conteudo: '',
            objeto: {
                value: null,
                default: null,
                label: 'Pesquisa'
            },
            categoria: {
                value: null,
                default: null,
                label: 'Categoria'
            }
        }
    },

    [mutationTypes.PROJETO.SET_RESUMO_DO_PROJETO](state, resumo) {
        Vue.set(state.projeto, 'resumoProjeto', resumo)
    },

    [mutationTypes.PROJETO.SET_TAREFAS](state, tarefas) {
        Vue.set(state.projeto, 'tarefas', tarefas)
    }
}
