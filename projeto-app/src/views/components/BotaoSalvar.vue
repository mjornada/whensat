<template>
    <az-call-to-action id="botaoSalvar" @click="$emit('salvar')" slot="actions" css-class="text-uppercase b-0">
        Salvar
    </az-call-to-action>
</template>

<script>
    export default {
        name: 'BotaoSalvar'
    }
</script>

<style scoped lang="stylus">
    .b-0
        border 0
</style>