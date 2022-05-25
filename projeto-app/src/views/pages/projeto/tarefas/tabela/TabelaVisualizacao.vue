<template>
    <v-data-table :headers="colunas" :items="value" hide-actions
                  class="az-table-list pr-tabela-visualizacao">
        <template slot="items" slot-scope="props">
            <td>
                {{ props.item.nome }}
            </td>
            <td ref="coluna_descricao">
                <expansao-texto :tamanho="tamanho" :texto="props.item.descricao"/>
            </td>
            <td>
                {{ props.item.categoria | azEnum(categoriasTarefas) }}
            </td>
            <td>
                {{ props.item.tempoExecutado | azNumber }}
            </td>
            <td>
                {{ props.item.situacao | azEnum(situacoes) }}
            </td>
            <td class="table-actions" align="center">
                <v-tooltip top>
                    <a id="botaoEditar" slot="activator"
                       @click="$emit('visualizarTarefa', props.item)">
                        <v-icon size="15">fas fa-eye</v-icon>
                    </a>
                    Visualizar
                </v-tooltip>
            </td>
        </template>
    </v-data-table>
</template>

<script>
    import {categoriasTarefas, situacoes} from '@/core/constants'

    export default {
        name: 'TabelaVisualizacao',
        props: {
            value: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                categoriasTarefas,
                situacoes,
                tamanho: null,
                colunas: [
                    {
                        value: 'nome',
                        text: 'Nome',
                        sortable: true,
                        width: '20%',
                        align: 'left',
                        class: 'primary--text'
                    },
                    {
                        value: 'descricao',
                        text: 'Descrição',
                        sortable: false,
                        width: '35%',
                        align: 'left',
                        class: 'primary--text'
                    },
                    {
                        value: 'categoria',
                        text: 'Categoria',
                        sortable: false,
                        width: '15%',
                        align: 'left',
                        class: 'primary--text'
                    },
                    {
                        value: 'tempoExecutado',
                        text: 'Tempo Exec.',
                        sortable: false,
                        width: '10%',
                        align: 'left',
                        class: 'primary--text'
                    },
                    {
                        value: 'situacao',
                        text: 'Situação',
                        sortable: false,
                        width: '15%',
                        align: 'left',
                        class: 'primary--text'
                    },
                    {
                        sortable: false,
                        text: 'Ações',
                        width: '5%',
                        class: 'primary--text',
                        align: 'center'
                    }
                ]
            }
        },
        created() {
            window.addEventListener('resize', this.pegarTamanho)
            this.pegarTamanho()
        },
        methods: {
            pegarTamanho() {
                this.tamanho = .082 * window.innerWidth
            }
        },
        destroyed() {
            window.removeEventListener('resize', this.pegarTamanho)
        }
    }
</script>

<style scoped lang="stylus">
    @media (max-width: 720px)
        .pr-tabela-visualizacao
            td:nth-of-type(1):before
                content "Nome:"

            td:nth-of-type(2):before
                content "Descrição:"

            td:nth-of-type(3):before
                content "Categoria:"

            td:nth-of-type(4):before
                content "Tempo de Execução:"

            td:nth-of-type(5):before
                content "Situação:"

            td:nth-of-type(6):before
                display none
</style>