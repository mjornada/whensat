<template>
	<div class="az-container card-erro-container">
		<div class="mensagem-erro">
			<p>Redirecionando para a edição do seus dados cadastrais.</p>
		</div>
	</div>
</template>

<script>
import { actionTypes } from '@/core/constants'

export default {
	name: 'redireciona-editar-usuario',
	async created() {
		const data = await this.$store.dispatch(actionTypes.COMUM.BUSCAR_LINK_EDITAR_USUARIO)
		window.location.assign(this.tratarLinkSemDominio(data))
	},
	methods: {
		tratarLinkSemDominio(link) {
			return link.replace('null', '')
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
