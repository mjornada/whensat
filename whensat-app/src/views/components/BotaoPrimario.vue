<template>
	<v-btn depressed color="primary" @click="$emit('click')">
		<span v-if="icone" class="material-icons mr-1">{{ icone }}</span>
		<span v-if="texto">{{ texto }}</span>
	</v-btn>
</template>

<script>
export default {
	name: 'botao-primario',
	props: {
		icone: {
			type: String,
			default: '',
		},
		texto: {
			type: String,
			default: '',
		},
	},
}
</script>

<style scoped lang="stylus"></style>
