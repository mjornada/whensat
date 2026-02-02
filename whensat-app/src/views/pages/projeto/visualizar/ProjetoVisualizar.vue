<template>
	<v-form class="az-form-content mt-0">
		<v-container fluid grid-list-xl white>
			<h3 class="pr-titulo">Informações do projeto</h3>

			<v-layout class="ma-0" wrap align-center white>
				<v-flex xs12 sm12>
					<div id="nome" class="az-text">
						<label>Nome</label>
						<p>{{ dados.nome ? dados.nome : '-' }}</p>
					</div>
				</v-flex>
				<v-flex xs12 sm12>
					<div id="descricao" class="az-text">
						<label>Descrição</label>
						<p>{{ dados.descricao ? dados.descricao : '-' }}</p>
					</div>
				</v-flex>
				<v-flex xs12 sm3>
					<div id="dataHoraInicial" class="az-text">
						<label>Data/Hora Inicial</label>
						<p>{{ dados.dataHoraInicial | azDate(formatosDefault.DATA_HORA_MINUTO) }}</p>
					</div>
				</v-flex>
				<v-flex xs12 sm3>
					<div id="dataHoraFinal" class="az-text">
						<label>Data/Hora Final</label>
						<p>{{ dados.dataHoraFinal | azDate(formatosDefault.DATA_HORA_MINUTO) }}</p>
					</div>
				</v-flex>
				<v-flex xs12 sm3>
					<div id="categoria" class="az-text">
						<label>Categoria</label>
						<p>{{ dados.categoria | azEnum(categoriasProjetos) }}</p>
					</div>
				</v-flex>
				<v-flex xs12 sm3>
					<div id="situacao" class="az-text">
						<label>Situação</label>
						<p>{{ dados.situacao | azEnum(situacoes) }}</p>
					</div>
				</v-flex>
			</v-layout>

			<div class="az-actions-form pr-acoes-formulario">
				<botao-texto icone="arrow_left" texto="Voltar" @click="tratarEventoVoltar"></botao-texto>
			</div>
		</v-container>
	</v-form>
</template>

<script>
import { actionTypes, categoriasProjetos, situacoes, formatosDefault, routesNames } from '@/core/constants'

export default {
	name: 'projeto-visualizar',
	data() {
		return {
			dados: {},
			projetoId: null,
			categoriasProjetos,
			situacoes,
			formatosDefault,
		}
	},
	async mounted() {
		try {
			this.setProjetoId()
			await this.buscarProjeto()
		} catch (e) {
			this.mostrarNotificacaoErro(e.message)
		}
	},
	methods: {
		async buscarProjeto() {
			await this.$store.dispatch(actionTypes.PROJETO.BUSCAR_POR_ID, this.projetoId)
			this.dados = this.$store.state.projeto.dados
		},
		setProjetoId() {
			this.projetoId = this.$route.params.id
		},
		tratarEventoVoltar() {
			this.$router.push({ name: routesNames.PROJETO_TODOS })
		},
	},
}
</script>

<style scoped lang="stylus"></style>
