<template>
    <v-dialog v-model="exibirModalTarefa" max-width="700">
        <v-card>
            <v-card-title class="primary modal-title" primary-title>
                <span>{{ titulo }}</span>
                <v-btn flat depressed @click="$emit('fecharModal')">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text class="az-form-content mt-0">
                <v-container grid-list-md>
                    <v-layout wrap white>
                        <v-flex xs12>
                            <div id="nome" class="az-text">
                                <label>Nome</label>
                                <p>{{ value.nome ? value.nome : '-' }}</p>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <div id="descricao" class="az-text">
                                <label>Descrição</label>
                                <p>{{ value.descricao ? value.descricao : '-' }}</p>
                            </div>
                        </v-flex>
                        <v-flex xs6>
                            <div id="categoria" class="az-text">
                                <label>Categoria</label>
                                <p>{{ value.categoria | azEnum(categoriasTarefas) }}</p>
                            </div>
                        </v-flex>
                        <v-flex xs6>
                            <div id="projeto" class="az-text">
                                <label>Projeto</label>
                                <p>{{ value.projetoId | projetoFilter($store.state.projeto.projetosValidos) }}</p>
                            </div>
                        </v-flex>
                        <v-flex xs4>
                            <div id="tempoEstimado" class="az-text">
                                <label>Tempo Estimado (em horas)</label>
                                <p>{{ value.tempoEstimado | azNumber }}</p>
                            </div>
                        </v-flex>
                        <v-flex xs4>
                            <div id="tempoExecutado" class="az-text">
                                <label>Tempo Executado (em horas)</label>
                                <p>{{ value.tempoExecutado | azNumber }}</p>
                            </div>
                        </v-flex>
                        <v-flex xs4>
                            <div id="situacao" class="az-text">
                                <label>Situação</label>
                                <p>{{ value.situacao | azEnum(situacoes) }}</p>
                            </div>
                        </v-flex>
                        <v-flex xs12 d-flex class="pr-area__botao">
                            <az-call-to-action id="botaoCancelar"
                                               @click="$emit('fecharModal')"
                                               slot="actions">
                                Cancelar
                            </az-call-to-action>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import {categoriasTarefas, situacoes} from '@/core/constants'

    export default {
        name: 'ModalTarefaEdicao',
        props: {
            value: {
                required: true
            },
            exibirModalTarefa: {
                type: Boolean,
                default: false
            },
            titulo: {
                type: String,
                default: 'Criar nova tarefa'
            }
        },
        data() {
            return {
                categoriasTarefas,
                situacoes
            }
        },
        inject: ['$validator'],
        filters: {
            projetoFilter(projetoId, projetos) {
                const projetosEncontrados = projetos.filter(item => item.id === projetoId)
                if (projetosEncontrados.length > 0) {
                    return projetosEncontrados[0].nome
                }
                return '-'
            }
        }
    }
</script>

<style scoped lang="stylus">
    .modal-title
        justify-content space-between

        .v-btn
            padding 0
            margin 0
            color #fff
            box-sizing border-box
            min-width 25px

    .action-primary
        padding 10px 15px
        border 1px solid #7aa329
        background-color #7aa329 !important
        color #fff !important
        width 100%
        box-sizing border-box

    .pr-area__botao
        text-align center
        justify-content center

        button
            max-width 200px
</style>