<template>
    <az-container>
        <az-form>
            <v-data-table :headers="colunas" :items="itens" :total-items="totalItens"
                          :pagination.sync="paginacaoInterna" :loading="false"
                          no-data-text="Não há projetos cadastrados" hide-actions
                          class="az-table-list pr-tabela-todos-projetos">
                <template slot="items" slot-scope="props">
                    <tr @click="$emit('acessar', props.item)">
                        <td>
                            {{ props.item.nome }}
                        </td>
                        <td>
                            <expansao-texto :tamanho="125" :texto="props.item.descricao"/>
                        </td>
                        <td>
                            {{ props.item.categoria | azEnum(categoriasProjetos) }}
                        </td>
                        <td>
                            {{ props.item.situacao | azEnum(situacoes) }}
                        </td>
                        <td class="table-actions">
                            <v-tooltip top>
                                <a slot="activator">
                                    <i class="fas fa-sign-in-alt"></i>
                                </a>
                                Acessar
                            </v-tooltip>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <div class="az-pagination">
                <v-pagination v-model="paginacaoInterna.page" :length="paginas"/>
                <div class="az-select-pagination">
                    <span>Linhas por página:</span>
                    <v-select :items="linhasPorPagina" v-model="paginacaoInterna.rowsPerPage"/>
                </div>
            </div>
        </az-form>
    </az-container>
</template>

<script>
    import {mapState} from 'vuex'
    import {categoriasProjetos, situacoes} from '@/core/constants'

    export default {
        name: 'TodosProjetosTabela',
        props: ['itens', 'paginacao', 'paginas', 'totalItens'],
        data() {
            return {
                colunas: [
                    {
                        text: 'Nome',
                        value: 'nome',
                        sortable: true,
                        align: 'left',
                        width: '100px',
                        class: 'primary--text'
                    },
                    {
                        text: 'Descrição',
                        value: 'descricao',
                        sortable: true,
                        align: 'left',
                        width: '200px',
                        class: 'primary--text'
                    },
                    {
                        text: 'Categoria',
                        value: 'categoria',
                        sortable: true,
                        align: 'left',
                        width: '60px',
                        class: 'primary--text'
                    },
                    {
                        text: 'Situação',
                        value: 'situacao',
                        sortable: true,
                        align: 'left',
                        width: '60px',
                        class: 'primary--text'
                    },
                    {
                        text: 'Ações',
                        sortable: false,
                        align: 'center',
                        width: '30px',
                        class: 'primary--text'
                    }
                ],
                paginacaoInterna: this.paginacao,
                linhasPorPagina: [10, 25, 50, 100],
                categoriasProjetos,
                situacoes
            }
        },
        computed: {
            ...mapState(['loki'])
        },
        watch: {
            paginacaoInterna: {
                handler(novoValor) {
                    this.$emit('paginar', novoValor)
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="stylus">
    .pr-tabela-todos-projetos td:hover
        cursor pointer !important

    @media (max-width: 720px)
        .pr-tabela-todos-projetos
            td:nth-of-type(1):before
                content "Nome:"

            td:nth-of-type(2):before
                content "Descrição:"

            td:nth-of-type(3):before
                content "Categoria:"

            td:nth-of-type(4):before
                content "Situação:"

            td:nth-of-type(5):before
                display none
</style>