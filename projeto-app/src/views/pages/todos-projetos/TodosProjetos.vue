<template>
    <div>
        <az-toolbar>
            <az-call-to-action active slot="actions" @click="tratarEventoNovoProjeto">
                <v-icon>add_circle</v-icon>
                Novo
            </az-call-to-action>

            <az-search slot="simpleSearch"
                       :filter="filtrosAtivos"
                       @simple-search="tratarEventoBuscaSimples"
                       @remove-filter="tratarEventoRemoverFiltro"
                       @advanced-search="tratarEventoBuscaAvancada"
                       @clear="tratarEventoLimpar"
                       simple-search-placeholder="Busque por: nome ou descrição">
                <az-search-item slot="search-items">
                    <az-combo-enum v-model="filtrosInterno.categoria.value"
                                   label="Categoria"
                                   name="categoria"
                                   :enum-object="categoriasProjetos"/>
                </az-search-item>
            </az-search>
        </az-toolbar>

        <todos-projetos-tabela :itens="itens"
                               :paginas="paginas"
                               :total-itens="totalItens"
                               :paginacao="$store.state.projeto.resultadoBuscaTodosProjetos.paginacao"
                               @paginar="tratarEventoPaginar"
                               @acessar="tratarEventoAcessar"/>
    </div>
</template>

<script>
    import _ from 'lodash'
    import {actionTypes, categoriasProjetos, mutationTypes} from '@/core/constants'
    import TodosProjetosTabela from './TodosProjetosTabela'

    export default {
        name: 'TodosProjetos',
        components: {
            TodosProjetosTabela
        },
        data() {
            return {
                filtrosInterno: this.getFiltros(),
                itens: [],
                paginas: 0,
                totalItens: 0,
                idItemParaDeletar: null,
                categoriasProjetos
            }
        },
        computed: {
            filtrosAtivos() {
                const filtros = this.getFiltros()
                const filtrosAtivos = {}
                for (let [chave] of Object.entries(filtros)) {
                    if (filtros[chave].value) {
                        // if (chave === 'categoria') {
                        //     val.value = filtroStatusLicitacao(val.value)
                        // }
                        // val.valueTruncated = filters.azClipText(val.value, 10)
                        // filtrosAtivos[chave] = val
                    }
                }
                return filtrosAtivos
            }
        },
        methods: {
            async buscar() {
                this.$store.commit(mutationTypes.PROJETO.SET_FILTROS_BUSCA_TODOS_PROJETOS, this.getFiltrosInterno())
                this.setMensagemLoading('Carregando projetos...')
                const resultado = await this.$store.dispatch(actionTypes.PROJETO.BUSCAR_TODOS_PROJETOS)
                this.itens = resultado.itens
                this.paginas = resultado.totalPages
                this.totalItens = resultado.totalElements
            },
            tratarEventoNovoProjeto() {
                this.$router.push({name: 'DadosGeraisNovo'})
            },
            tratarEventoPaginar(paginacao) {
                this.$store.commit(mutationTypes.PROJETO.SET_PAGINACAO_BUSCA_TODOS_PROJETOS, paginacao)
                this.buscar()
            },
            tratarEventoBuscaSimples(valor) {
                this.filtrosInterno.conteudo = valor
                this.filtrosInterno.objeto.value = valor
                this.buscar()
            },
            tratarEventoRemoverFiltro(propriedade) {
                if (this.filtrosInterno && Object.prototype.hasOwnProperty.call(this.filtrosInterno, propriedade)) {
                    this.filtrosInterno[propriedade].value = this.filtrosInterno[propriedade].default
                }
                this.filtrosInterno.conteudo = ''
                this.buscar()
            },
            tratarEventoBuscaAvancada() {
                this.buscar()
            },
            tratarEventoLimpar() {
                this.$store.commit(mutationTypes.PROJETO.SET_LIMPAR_FILTROS_BUSCA_PROJETO)
                this.filtrosInterno = this.getFiltros()
                this.buscar()
            },
            tratarEventoAcessar(item) {
                const id = item.id
                if (item.situacao === 'ABERTO') {
                    this.$router.push({name: 'DadosGeraisEdicao', params: {id}})
                } else {
                    this.$router.push({name: 'DadosGeraisVisualizacao', params: {id}})
                }
            },
            getFiltros() {
                return _.cloneDeep(this.$store.state.projeto.resultadoBuscaTodosProjetos.filtros)
            },
            getFiltrosInterno() {
                return _.cloneDeep(this.filtrosInterno)
            }
        }
    }
</script>