<template>
    <v-dialog v-model="exibirModalTarefa" persistent max-width="700">
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
                            <v-text-field label="Nome"
                                          name="Nome"
                                          :error-messages="errors.collect('Nome')"
                                          placeholder="Digite o nome"
                                          v-model="value.nome"
                                          v-validate="'required'"
                                          maxlength="100"/>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea name="Descrição"
                                        label="Descrição"
                                        v-model="value.descricao"
                                        rows="2"
                                        placeholder="Digite a descrição"
                                        maxlength="500"/>
                        </v-flex>
                        <v-flex xs6>
                            <az-combo-enum name="Categoria"
                                           label="Categoria"
                                           placeholder="Selecione"
                                           v-model="value.categoria"
                                           is-required
                                           :enum-object="categoriasTarefas"/>
                        </v-flex>
                        <v-flex xs6>
                            <div id="projeto" class="az-text" v-if="value.projetoId">
                                <label>Projeto</label>
                                <p>{{ value.projetoId | projetoFilter($store.state.projeto.projetosValidos) }}</p>
                            </div>
                            <v-autocomplete v-else
                                            v-model="value.projeto"
                                            :items="projetos"
                                            placeholder="Ex. Dispensa"
                                            name="Projeto"
                                            label="Projeto"
                                            v-validate="'required'"
                                            required
                                            :error-messages="errors.collect('Projeto')"
                                            :search-input.sync="buscarProjeto"/>

                        </v-flex>
                        <v-flex xs4>
                            <v-text-field label="Tempo Estimado (em horas)"
                                          name="Tempo Estimado"
                                          placeholder="Ex. 4 horas"
                                          :error-messages="errors.collect('Tempo Estimado')"
                                          type="number"
                                          min="1"
                                          v-model="value.tempoEstimado"
                                          v-validate="'required|max:9|min_value:1'"/>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field label="Tempo Executado (em horas)"
                                          name="Tempo Executado"
                                          placeholder="Ex. 4 horas"
                                          :error-messages="errors.collect('Tempo Executado')"
                                          type="number"
                                          min="1"
                                          v-model="value.tempoExecutado"
                                          v-validate="'required|max:9|min_value:1'"/>
                        </v-flex>
                        <v-flex xs4>
                            <az-combo-enum name="Situação"
                                           label="Situação"
                                           placeholder="Selecione"
                                           v-model="value.situacao"
                                           is-required
                                           :enum-object="situacoes"/>
                        </v-flex>
                        <v-flex xs12 d-flex class="pr-area__botao">
                            <az-call-to-action id="botaoCancelar"
                                               @click="$emit('fecharModal')"
                                               slot="actions">
                                Cancelar
                            </az-call-to-action>
                            <az-call-to-action id="botaoSalvar"
                                               @click="$emit('salvarTarefa', value)"
                                               slot="actions"
                                               css-class="action-primary">
                                Salvar
                            </az-call-to-action>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import {actionTypes, categoriasTarefas, situacoes} from '@/core/constants'

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
                buscarProjeto: null,
                projetos: [],
                categoriasTarefas,
                situacoes
            }
        },
        inject: ['$validator'],
        filters: {
            projetoFilter(projetoId, projetos) {
                const projetosEncontrados = projetos.filter(item => item.id == projetoId)
                if (projetosEncontrados.length > 0) {
                    return projetosEncontrados[0].nome
                }
                return '-'
            }
        },
        watch: {
            async buscarProjeto(projeto) {
                if (projeto && projeto.length > 1) {
                    try {
                        await this.$store.dispatch(actionTypes.PROJETO.BUSCAR_NOMES_DOS_PROJETOS, projeto)
                        this.projetos = this.$store.state.projeto.projetosValidos.map(proj => proj.nome)
                    } catch (e) {
                        this.mostrarNotificacaoErro(e.message)
                    }
                }
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