<template>
	<az-container>
		<az-form>
			<v-data-table
				:headers="colunas"
				:items="itens"
				:server-items-length="totalItens"
				:options="paginacaoInterna"
				:loading="false"
				no-data-text="Não há projetos cadastrados"
				hide-default-footer
				class="az-table-list pr-tabela-todos-projetos"
			>
				<template #body="{ items }">
					<tbody>
						<tr v-for="item in items" :key="item.id" @click="$emit('acessar', item)">
							<td>
								{{ item.nome }}
							</td>
							<td>
								{{ item.descricao }}
							</td>
							<td>
								{{ item.categoria | azEnum(categoriasProjetos) }}
							</td>
							<td>
								{{ item.situacao | azEnum(situacoes) }}
							</td>
							<td class="table-actions">
								<v-tooltip top>
									<template #activator="{ on }">
										<a v-on="on">
											<span class="material-icons">login</span>
										</a>
									</template>
									Acessar
								</v-tooltip>
								<v-tooltip top class="ml-2">
									<template #activator="{ on }">
										<a v-on="on" @click.stop="$emit('excluir', item)">
											<span class="material-icons">delete</span>
										</a>
									</template>
									Excluir
								</v-tooltip>
							</td>
						</tr>
					</tbody>
				</template>
			</v-data-table>
			<div class="az-pagination">
				<v-pagination v-model="paginacaoInterna.page" :length="paginas"></v-pagination>
				<div class="az-select-pagination">
					<span>Linhas por página:</span>
					<v-select v-model="paginacaoInterna.rowsPerPage" :items="linhasPorPagina"></v-select>
				</div>
			</div>
		</az-form>
	</az-container>
</template>

<script>
import { mapState } from 'vuex'
import { categoriasProjetos, situacoes } from '@/core/constants'

export default {
	name: 'projeto-todos-tabela',
	props: {
		itens: {
			type: Array,
			required: true,
		},
		paginacao: {
			type: Object,
			required: true,
		},
		paginas: {
			type: Number,
			required: true,
		},
		totalItens: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			colunas: [
				{
					text: 'Nome',
					value: 'nome',
					sortable: true,
					align: 'left',
					width: '100px',
					class: 'primary--text',
				},
				{
					text: 'Descrição',
					value: 'descricao',
					sortable: true,
					align: 'left',
					width: '200px',
					class: 'primary--text',
				},
				{
					text: 'Categoria',
					value: 'categoria',
					sortable: true,
					align: 'left',
					width: '60px',
					class: 'primary--text',
				},
				{
					text: 'Situação',
					value: 'situacao',
					sortable: true,
					align: 'left',
					width: '60px',
					class: 'primary--text',
				},
				{
					text: 'Ações',
					sortable: false,
					align: 'center',
					width: '30px',
					class: 'primary--text',
				},
			],
			paginacaoInterna: this.paginacao,
			linhasPorPagina: [10, 25, 50, 100],
			categoriasProjetos,
			situacoes,
		}
	},
	computed: {
		...mapState(['loki']),
	},
	watch: {
		paginacaoInterna: {
			handler(novoValor) {
				this.$emit('paginar', novoValor)
			},
			deep: true,
		},
	},
}
</script>

<style scoped lang="stylus">
.pr-tabela-todos-projetos td:hover
	cursor pointer !important

@media (max-width: 720px)
	.pr-tabela-todos-projetos
		td:nth-of-type(1):before
			content "Nome:"

		td:nth-of-type(2):before
			content "Descrição:"

		td:nth-of-type(3):before
			content "Categoria:"

		td:nth-of-type(4):before
			content "Situação:"

		td:nth-of-type(5):before
			display none
</style>
