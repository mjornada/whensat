<template>
	<div>
		<az-toolbar>
			<botao-primario
				slot="actions"
				icone="add_circle"
				texto="Novo"
				@click="tratarEventoNovoProjeto"
			></botao-primario>

			<az-search
				slot="simpleSearch"
				:filter="Object.create(null)"
				simple-search-placeholder="Busque por nome"
				@simple-search="tratarEventoBuscaSimples"
			>
			</az-search>
		</az-toolbar>

		<projeto-todos-tabela
			:itens="itens"
			:paginas="paginas"
			:total-itens="totalItens"
			:paginacao="$store.state.projeto.resultadoBuscaTodosProjetos.paginacao"
			@paginar="tratarEventoPaginar"
			@acessar="tratarEventoAcessar"
		></projeto-todos-tabela>
	</div>
</template>

<script>
import _ from 'lodash'
import { actionTypes, mutationTypes, routesNames } from '@/core/constants'
import ProjetoTodosTabela from './ProjetoTodosTabela'

export default {
	name: 'projeto-todos',
	components: {
		ProjetoTodosTabela,
	},
	data() {
		return {
			filtrosInterno: this.getFiltros(),
			itens: [],
			paginas: 0,
			totalItens: 0,
		}
	},
	created() {
		this.buscar()
	},
	methods: {
		async buscar() {
			this.$store.commit(mutationTypes.PROJETO.SET_FILTROS_BUSCAR_TODOS, this.getFiltrosInterno())
			const resultado = await this.$store.dispatch(actionTypes.PROJETO.BUSCAR_TODOS)
			this.itens = resultado.itens
			this.paginas = resultado.totalPages
			this.totalItens = resultado.totalElements
		},
		tratarEventoNovoProjeto() {
			this.$router.push({ name: routesNames.PROJETO_NOVO })
		},
		tratarEventoPaginar(paginacao) {
			this.$store.commit(mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS, paginacao)
			this.buscar()
		},
		tratarEventoBuscaSimples(valor) {
			this.filtrosInterno.nome = valor
			this.buscar()
		},
		tratarEventoAcessar(item) {
			const id = item.id
			if (item.situacao === 'ENCERRADO') {
				this.$router.push({ name: routesNames.PROJETO_VISUALIZAR, params: { id } })
			} else {
				this.$router.push({ name: routesNames.PROJETO_EDITAR, params: { id } })
			}
		},
		getFiltros() {
			return _.cloneDeep(this.$store.state.projeto.resultadoBuscaTodosProjetos.filtros)
		},
		getFiltrosInterno() {
			return _.cloneDeep(this.filtrosInterno)
		},
	},
}
</script>
