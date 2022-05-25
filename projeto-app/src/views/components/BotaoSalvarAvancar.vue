<template>
    <div class="align-right">
        <az-call-to-action  id="botaoSalvarAvancar" @click="$emit('salvarEAvancar')" slot="actions" css-class="action-primary text-uppercase d-flex align-center">
            Avançar
            <v-icon color="white">
                keyboard_arrow_right
            </v-icon>
        </az-call-to-action>
    </div>
</template>

<script>
    export default {
        name: 'BotaoSalvarAvancar'
    }
</script>

<style scoped lang="stylus">
    .action-primary
        padding 10px 15px
        border 1px solid #7aa329
        background-color #7aa329 !important
        color #fff !important
        margin-left 10px
        border-radius 2px

        i
            margin-right 0
</style>