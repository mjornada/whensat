<template>
	<v-form class="az-form-content">
		<v-container fluid grid-list-xl white>
			<h3 class="pr-titulo">Informações do projeto</h3>

			<v-layout class="ma-0" wrap align-center white>
				<v-flex xs12 sm12>
					<v-text-field
						v-model="dados.nome"
						v-validate="'required'"
						label="Nome"
						name="Nome"
						:error-messages="errors.collect('Nome')"
						placeholder="Digite o nome"
						:maxlength="100"
					></v-text-field>
				</v-flex>
				<v-flex xs12 sm12>
					<v-textarea
						v-model="dados.descricao"
						name="Descrição"
						label="Descrição"
						rows="2"
						placeholder="Digite a descrição"
						maxlength="500"
					></v-textarea>
				</v-flex>
				<v-flex xs12 sm6>
					<az-date
						v-model="dados.dataHoraInicial"
						date-time
						label="Data/Hora Inicial"
						name-date="Data Inicial"
						name-hour="Hora Inicial"
						is-required
					></az-date>
				</v-flex>
				<v-flex xs12 sm6>
					<az-date
						v-model="dados.dataHoraFinal"
						date-time
						label="Data/Hora Final"
						name-date="Data Final"
						name-hour="Hora Final"
						is-required
					></az-date>
				</v-flex>
				<v-flex xs12 sm3>
					<az-combo-enum
						v-model="dados.categoria"
						name="Categoria"
						label="Categoria"
						placeholder="Selecione"
						is-required
						:enum-object="categoriasProjetos"
					></az-combo-enum>
				</v-flex>
			</v-layout>

			<div class="az-actions-form">
				<botao-texto icone="arrow_left" texto="Voltar" @click="tratarEventoVoltar"></botao-texto>
				<botao-primario icone="save" texto="Salvar" @click="tratarEventoSalvarEAvancar"></botao-primario>
			</div>
		</v-container>
	</v-form>
</template>

<script>
import { actionTypes, categoriasProjetos, routesNames, situacoes } from '@/core/constants'

export default {
	name: 'projeto-novo',
	$_veeValidate: {
		validator: 'new',
	},
	data() {
		return {
			dados: {
				situacao: 'ABERTO',
			},
			rotasAvancar: ['TarefasEdicao'],
			categoriasProjetos,
			situacoes,
			projetoId: null,
		}
	},
	methods: {
		async tratarEventoSalvarEAvancar() {
			await this.validarDadosFormulario()
			this.setMensagemLoading('Salvando...')
			await this.$store.dispatch(actionTypes.PROJETO.SALVAR_NOVO, this.dados)
			this.projetoId = this.$store.state.projeto.dados.id
			this.mostrarNotificacaoSucessoDefault()
			this.redirecionarParaProximaPagina()
		},
		async validarDadosFormulario() {
			const valido = await this.$validator._base.validateAll()
			if (!valido) {
				throw new Error('Preencha os campos obrigatórios.')
			}
		},
		tratarEventoVoltar() {
			this.$router.push({ name: routesNames.PROJETO_TODOS })
		},
		redirecionarParaProximaPagina() {
			this.$router.push({ name: routesNames.PROJETO_TODOS })
		},
	},
}
</script>

<style scoped lang="stylus"></style>
