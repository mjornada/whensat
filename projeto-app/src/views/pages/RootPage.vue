<template>
	<div class="projeto">
		<az-template-default id="az-template-default">
			<router-view></router-view>
		</az-template-default>
	</div>
</template>

<script>
export default {
	name: 'root-page',
}
</script>

<style lang="stylus">
.projeto

	.pr-text-color
		color var(--v-secondary-base)

	.pr-titulo
		color #777
		padding 12px

	.az-template-default

		.az-logo
			display flex
			justify-content center
			align-items center
			padding-top 16px

			a
				max-width 150px

		.active-menu
			font-weight: 700 !important

		.az-menu

			.v-list-item__title
				font-weight 700
				color rgba(255, 255, 255, 0.8) !important

		.container
			padding 1px

		.mobile_menu
			display none

		.toolbar
			-webkit-box-shadow 0 2px 4px -1px rgba(0, 0, 0, 0.2) !important
			box-shadow 0 2px 4px -1px rgba(0, 0, 0, 0.2) !important
			background-color #fff !important

	&__erro-inicializacao
		width 100%
		padding 0
		text-align center
		color #555
		height 90vh
		display flex
		justify-content center
		align-items center

		i
			font-size 36px

		p
			font-size 20px
			margin 10px 0 0
			font-weight 600
</style>
