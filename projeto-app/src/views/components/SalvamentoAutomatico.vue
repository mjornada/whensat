<template>
    <div>
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <span v-on="on" v-html="mensagem"></span>
            </template>
            <span>Salvo {{ formatarHora(dataUltimoSalvamento) }} atrás</span>
        </v-tooltip>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        name: 'SalvamentoAutomatico',
        data() {
            return {
                dataUltimoSalvamento: this.$store.state.comum.salvamentoAutomatico.dataUltimoSalvamento
            }
        },
        computed: {
            mensagem() {
                if (this.$store.state.comum.salvamentoAutomatico.salvando) {
                    return this.mensagens.SALVANDO
                }
                if (!this.$store.state.comum.salvamentoAutomatico.salvando && this.$store.state.comum.salvamentoAutomatico.dataUltimoSalvamento) {
                    return this.mensagens.SALVO_AUTOMATICO
                }
                return ''
            }
        },
        methods: {
            formatarHora(data) {
                const end = moment(data)
                const duration = moment.duration(end.diff(moment()))
                return duration.humanize(true)
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>