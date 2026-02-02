<template>
	<div class="az-container card-erro-container">
		<div class="mensagem-erro">
			<h1>Erro 404</h1>
			<p>Página não encontrada.</p>
			<az-call-to-action
				id="botaoVoltar"
				key="notFound"
				css-class="action-primary"
				style="margin-bottom: 20px"
				@click="voltarParaInicio"
			>
				Voltar para Início
			</az-call-to-action>
		</div>
	</div>
</template>

<script>
import { routesNames } from '@/core/constants'

export default {
	name: 'pagina-nao-encontrada',
	methods: {
		voltarParaInicio() {
			this.$router.push({ name: routesNames.INICIO })
		},
	},
}
</script>

<style lang="stylus" scoped>
.card-erro-container
    display flex
    justify-content center
    align-items center
    height calc(100vh - 136px)

    .mensagem-erro
        text-align center
</style>
