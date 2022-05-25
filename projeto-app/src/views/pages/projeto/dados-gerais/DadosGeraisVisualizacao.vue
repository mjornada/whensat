<template>
    <v-form class="az-form-content mt-0">
        <v-container fluid grid-list-xl white>
            <h3 class="pr-titulo">Informações</h3>

            <v-layout wrap align-center white>
                <v-flex xs12 sm12>
                    <div id="nome" class="az-text">
                        <label>Nome</label>
                        <p>{{ dadosGerais.nome ? dadosGerais.nome : '-' }}</p>
                    </div>
                </v-flex>
                <v-flex xs12 sm12>
                    <div id="descricao" class="az-text">
                        <label>Descrição</label>
                        <p>{{ dadosGerais.descricao ? dadosGerais.descricao : '-' }}</p>
                    </div>
                </v-flex>
                <v-flex xs12 sm3>
                    <div id="dataHoraInicial" class="az-text">
                        <label>Data/Hora Inicial</label>
                        <p>{{ dadosGerais.dataHoraInicial | az-date(formatosDefault.DATA_HORA_MINUTO) }}</p>
                    </div>
                </v-flex>
                <v-flex xs12 sm3>
                    <div id="dataHoraFinal" class="az-text">
                        <label>Data/Hora Final</label>
                        <p>{{ dadosGerais.dataHoraFinal | az-date(formatosDefault.DATA_HORA_MINUTO) }}</p>
                    </div>
                </v-flex>
                <v-flex xs12 sm3>
                    <div id="categoria" class="az-text">
                        <label>Categoria</label>
                        <p>{{ dadosGerais.categoria | azEnum(categoriasProjetos) }}</p>
                    </div>
                </v-flex>
                <v-flex xs12 sm3>
                    <div id="situacao" class="az-text">
                        <label>Situação</label>
                        <p>{{ dadosGerais.situacao | azEnum(situacoes) }}</p>
                    </div>
                </v-flex>
            </v-layout>

            <div class="az-actions-form pr-acoes-formulario">
                <botao-voltar @voltar="tratarEventoVoltar"/>
                <botao-avancar @avancar="tratarEventoAvancar"/>
            </div>
        </v-container>
    </v-form>
</template>

<script>
    import {actionTypes, categoriasProjetos, situacoes} from '@/core/constants'

    export default {
        name: 'DadosGeraisVisualizacao',
        data() {
            return {
                dadosGerais: {},
                projetoId: null,
                categoriasProjetos,
                situacoes
            }
        },
        async mounted() {
            try {
                this.setProjetoId()
                await this.buscarDadosGerais()
            } catch (e) {
                this.mostrarNotificacaoErro(e.message)
            }
        },
        methods: {
            async buscarDadosGerais() {
                await this.$store.dispatch(actionTypes.PROJETO.BUSCAR_DADOS_GERAIS, this.projetoId)
                this.dadosGerais = this.$store.state.projeto.dadosGerais
            },
            setProjetoId() {
                this.projetoId = this.$route.params.id
            },
            tratarEventoAvancar() {
                this.$router.push({name: 'TarefasVisualizacao', params: this.projetoId})
            },
            tratarEventoVoltar() {
                this.$router.push({name: this.$store.state.comum.rota.origem})
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>