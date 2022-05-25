<template>
    <az-template-default showMainHeader showNotification>
        <template slot="main-header">
            <salvamento-automatico class="pr-mensagem-salvamento"/>
        </template>
        <router-view/>
    </az-template-default>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState(['loki'])
        }
    }
</script>

<style lang="stylus">
    html, body, .application
        font-family 'Open Sans', sans-serif

    .notification i.white--text
        color rgb(119, 119, 119) !important

    table.v-table thead tr
        height auto !important

    .az-table-list tbody tr
        border-bottom 1px solid #e9e9e9

        td
            font-weight 400
            height 40px
            color #777
            font-size 13px

    .az-menu .v-list__tile__action i
        font-size 15px

    .az-container .az-table-list thead tr:first-child th
        white-space normal

    .az-logo img
        width 140px

    .v-navigation-drawer--mini-variant .az-logo img
        width auto

    .table-actions
        text-align center !important

        a
            color #777

        i
            font-size 16px

    .pr-mensagem-salvamento
        color var(--v-primary-base)
        margin-right 1rem

    .pr-area
        padding 20px 10px
        text-align center

    .pr-acoes-formulario
        padding 0

    .pr-titulo
        color #777
        margin-bottom 10px
</style>