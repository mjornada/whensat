<template>
    <div class="az-form-content mt-0">
        <v-container fluid grid-list-xl white>
            <h3 class="pr-titulo">Listagem</h3>

            <tabela-visualizacao v-model="tarefas"
                                 @visualizarTarefa="exibirModal"/>

            <div class="az-actions-form pr-acoes-formulario">
                <botao-voltar @voltar="tratarEventoVoltar"/>
            </div>
        </v-container>

        <modal-tarefa-visualizacao v-model="valor"
                                   :exibirModalTarefa="exibirModalTarefa"
                                   titulo='Visualizar tarefa'
                                   @fecharModal="fecharModalTarefaVisualizacao"/>
    </div>
</template>

<script>
    import {actionTypes} from '@/core/constants'
    import TabelaVisualizacao from './tabela/TabelaVisualizacao'
    import ModalTarefaVisualizacao from '@/views/pages/commons/modal-tarefa/ModalTarefaVisualizacao'

    export default {
        name: 'TarefasVisualizacao',
        components: {
            ModalTarefaVisualizacao,
            TabelaVisualizacao
        },
        data() {
            return {
                projetoId: null,
                tarefas: [],
                exibirModalTarefa: false,
                valor: {}
            }
        },
        async mounted() {
            try {
                this.setProjetoId()
                await this.buscarTarefas()
            } catch (e) {
                this.mostrarNotificacaoErro(e.message)
            }
        },
        methods: {
            async buscarTarefas() {
                await this.$store.dispatch(actionTypes.PROJETO.BUSCAR_TAREFAS, this.projetoId)
                this.tarefas = this.$store.state.projeto.tarefas
            },
            exibirModal(tarefa) {
                this.valor = tarefa
                this.exibirModalTarefaVisulizacao()
            },
            exibirModalTarefaVisulizacao() {
                this.exibirModalTarefa = true
            },
            fecharModalTarefaVisualizacao() {
                this.exibirModalTarefa = false
            },
            tratarEventoVoltar() {
                this.$router.push({name: 'DadosGeraisVisualizacao', params: this.projetoId})
            },
            setProjetoId() {
                this.projetoId = this.$route.params.id
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>