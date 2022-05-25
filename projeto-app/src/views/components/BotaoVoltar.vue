<template>
    <az-call-to-action @click="$emit('voltar')" slot="actions" css-class="text-uppercase d-flex align-center botao-default">
        <v-icon color="white">
            keyboard_arrow_left
        </v-icon>
        Voltar
    </az-call-to-action>
</template>

<script>
    export default {
        name: 'BotaoVoltar'
    }
</script>

<style scoped lang="stylus">
    .botao-default
        border 0
        color #777 !important

        .v-icon
            color #777 !important
</style>