<template>
    <div>
        <az-back-button :route="{name: rotaOrigem}" text="Voltar para listagem"/>
        <az-container class="pr-abas">
            <div class="az-tabs">
                <v-tabs left class="pr-abas__aba">
                    <v-tab v-for="aba in abasFormatadas"
                           :key="aba.ordem"
                           :to="construirRota(aba)"
                           :disabled="desabilitarAbaConformeSituacao(aba)"
                           exact
                           exact-active-class="active"
                           class="pr-abas__aba-item">
                        {{aba.titulo}}
                    </v-tab>
                </v-tabs>

                <router-view></router-view>
            </div>
        </az-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {actionTypes, mutationTypes, situacoes} from '@/core/constants'

    export default {
        name: 'Projeto',
        data() {
            return {
                abas: [
                    {
                        titulo: 'Dados Gerais',
                        rotaPadrao: 'DadosGeraisVisualizacao',
                        rotaEdicao: 'DadosGeraisEdicao',
                        rotaNovo: 'DadosGeraisNovo',
                        situacoesEdicao: ['ABERTO'],
                        ordem: 1
                    },
                    {
                        titulo: 'Tarefas',
                        rotaPadrao: 'TarefasVisualizacao',
                        rotaEdicao: 'TarefasEdicao',
                        situacoesEdicao: ['ABERTO'],
                        ordem: 2
                    }
                ],
                projetoId: null,
                rotaOrigem: this.$store.state.comum.rota.origem,
                situacoes
            }
        },
        computed: {
            ...mapState(['loki', 'projeto']),
            abasFormatadas() {
                return this.abas.map(({titulo, rotaPadrao, rotaEdicao, rotaNovo, situacoesEdicao, ordem}) => {
                    let name = rotaPadrao
                    if(!this.$store.state.projeto.resumoProjeto.id) {
                        name = rotaNovo
                    } else if (rotaEdicao && situacoesEdicao.includes(this.$store.state.projeto.resumoProjeto.situacao)) {
                        name = rotaEdicao
                    }
                    return {
                        titulo,
                        rota: name,
                        ordem
                    }
                })
            }
        },
        async beforeRouteUpdate(to, from, next) {
            try {
                this.setProjetoId()
                await this.buscarResumoProjeto()
                next()
            } catch (e) {
                this.mostrarNotificacaoErro(e.message)
            }
        },
        async created() {
            try {
                this.setProjetoId()
                await this.buscarResumoProjeto()
            } catch (e) {
                this.mostrarNotificacaoErro(e.message)
            }
        },
        mounted() {
            this.$store.commit(mutationTypes.COMUM.SET_RETRAIR_MENU)
        },
        methods: {
            async buscarResumoProjeto() {
                if (this.projetoId) {
                    this.setMensagemLoading('Carregando dados do projeto...')
                    await this.$store.dispatch(actionTypes.PROJETO.BUSCAR_RESUMO_DO_PROJETO, this.projetoId)
                }
            },
            construirRota(aba) {
                return {
                    name: aba.rota,
                    params: {id: this.$store.state.projeto.resumoProjeto.id},
                    query: this.$route.query
                }
            },
            desabilitarAbaConformeSituacao(aba) {
                return (!aba.rotaNovo && !this.$store.state.projeto.resumoProjeto.id)
            },
            setProjetoId() {
                this.projetoId = this.$route.params.id
            }
        },
        destroyed() {
            this.$store.commit(mutationTypes.COMUM.SET_EXPANDIR_MENU)
        }
    }
</script>

<style lang="stylus">
    .pr-abas
        .az-tabs
            padding 0
            margin 0

        &__aba
            &-item .v-tabs__item
                border-right 1px solid #fff
                border-left 1px solid #fff
                border-top 1px solid #fff
                border-bottom: 1px solid #ccc

            &-item .active
                border-right 1px solid #ccc
                border-top 1px solid #ccc
                border-left 1px solid #ccc
                border-bottom 1px solid #fff

            &-item .v-tabs__item--disabled
                border 0

    @media (max-width: 960px)
        .pr-abas .az-tabs
            padding 20px
</style>
