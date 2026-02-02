<template>
	<v-btn depressed text :color="color" @click="$emit('click')">
		<span v-if="icone" class="material-icons mr-1">{{ icone }}</span>
		<span v-if="texto">{{ texto }}</span>
	</v-btn>
</template>

<script>
export default {
	name: 'botao-texto',
	props: {
		icone: {
			type: String,
			default: '',
		},
		texto: {
			type: String,
			default: '',
		},
		color: {
			type: String,
			default: 'secondary',
		},
	},
}
</script>

<style scoped lang="stylus"></style>
