<template>
    <v-dialog v-if="mostrarDialogoExclusao" persistent max-width="290">
        <v-list-tile-title slot="activator">Excluir</v-list-tile-title>
        <az-confirm @onConfirm="$emit('confirmado')" @onDecline="$emit('recusado')">
            Deseja realmente excluir?
        </az-confirm>
    </v-dialog>
</template>

<script>
    export default {
        name: 'DialogoExclusao',
        props: ['mostrarDialogoExclusao']
    }
</script>