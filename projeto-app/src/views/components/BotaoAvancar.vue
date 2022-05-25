<template>
    <az-call-to-action @click="$emit('avancar')" slot="actions" css-class="text-uppercase d-flex align-center botao-default">
        Avançar
        <v-icon color="white">
            keyboard_arrow_right
        </v-icon>
    </az-call-to-action>
</template>

<script>
    export default {
        name: 'BotaoAvancar'
    }
</script>

<style scoped lang="stylus">
    .botao-default
        border 0
        color #777 !important

        .v-icon
            color #777 !important

        i
            margin-right 0
</style>