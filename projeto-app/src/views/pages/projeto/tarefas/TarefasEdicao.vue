<template>
    <div class="az-form-content mt-0">
        <v-container fluid grid-list-xl white>
            <az-call-to-action @click="exibirModalTarefaEdicao"
                               active
                               class="text-uppercase mb-3">
                Nova Tarefa
            </az-call-to-action>

            <h3 class="pr-titulo">Listagem</h3>

            <tabela-edicao v-model="tarefas"
                           @editarTarefa="exibirModalEditarTarefa"
                           @excluirTarefa="tratarEventoDeExcluirTarefa"/>

            <div class="az-actions-form pr-acoes-formulario">
                <botao-voltar @voltar="tratarEventoVoltar"/>
            </div>
        </v-container>

        <modal-tarefa-edicao v-model="valor"
                             :exibirModalTarefa="exibirModalTarefa"
                             :titulo=tituloModal
                             @salvarTarefa="tratarEventoDeSalvarTarefa"
                             @fecharModal="fecharModalTarefaEdicao"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {actionTypes} from '@/core/constants'
    import ModalTarefaEdicao from '@/views/pages/commons/modal-tarefa/ModalTarefaEdicao'
    import TabelaEdicao from './tabela/TabelaEdicao'

    export default {
        name: 'TarefasEdicao',
        components: {
            ModalTarefaEdicao,
            TabelaEdicao
        },
        data() {
            return {
                exibirModalTarefa: false,
                projetoId: null,
                tarefas: [],
                valor: {
                    projetoId: this.$route.params.id,
                    situacao: 'ABERTO'
                },
                tituloModal: 'Criar nova tarefa'
            }
        },
        $_veeValidate: {
            validator: 'new'
        },
        computed: {
            ...mapState(['loki'])
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
            async tratarEventoDeSalvarTarefa(valor) {
                await this.validarFormulario()
                if (valor.id) {
                    await this.$store.dispatch(actionTypes.PROJETO.EDITAR_TAREFA, valor)
                    this.mostrarNotificacaoSucesso('Tarefa atualizada com sucesso.')
                } else {
                    await this.$store.dispatch(actionTypes.PROJETO.SALVAR_TAREFA, valor)
                    this.mostrarNotificacaoSucesso('Tarefa adicionada com sucesso.')
                }
                await this.buscarTarefas()
                this.fecharModalTarefaEdicao()
            },
            async tratarEventoDeExcluirTarefa(tarefaId) {
                await this.$store.dispatch(actionTypes.PROJETO.REMOVER_TAREFA, tarefaId)
                this.mostrarNotificacaoSucessoDefault()
                await this.buscarTarefas()
            },
            async validarFormulario() {
                const resultado = await this.$validator._base.validateAll()
                if (!resultado)
                    throw new Error('Preencha os campos obrigatórios!')
            },
            exibirModalEditarTarefa(tarefa) {
                this.valor = tarefa
                this.tituloModal = 'Editar tarefa'
                this.exibirModalTarefaEdicao()
            },
            exibirModalTarefaEdicao() {
                this.exibirModalTarefa = true
            },
            fecharModalTarefaEdicao() {
                this.exibirModalTarefa = false
                this.valor = {
                    projetoId: this.$route.params.id,
                    situacao: 'ABERTO'
                }
            },
            tratarEventoVoltar() {
                this.$router.push({name: 'DadosGeraisEdicao', params: this.projetoId})
            },
            setProjetoId() {
                this.projetoId = this.$route.params.id
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>