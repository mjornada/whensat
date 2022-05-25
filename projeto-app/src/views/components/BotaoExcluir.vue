<template>
    <v-tooltip top>
        <a slot="activator" @click="$emit('excluir')">
            <i class="fas fa-trash-alt"></i>
        </a>
        Excluir
    </v-tooltip>
</template>

<script>
    export default {
        name: 'BotaoExcluir',
        props: ['id']
    }
</script>

<style scoped>

</style>