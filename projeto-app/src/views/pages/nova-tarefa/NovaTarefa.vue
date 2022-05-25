<template>
    <div>
        <az-call-to-action active @click="exibirModalNovaTarefa" class="text-uppercase"
                           v-if="!this.$store.state.loki.asideClosed">
            Nova Tarefa
        </az-call-to-action>

        <v-tooltip right v-if="this.$store.state.loki.asideClosed">
            <a slot="activator" role="button" class="pr-botao-menor secondary" @click="exibirModalNovaTarefa">
                <i class="fas fa-plus"></i>
            </a>
            Nova Tarefa
        </v-tooltip>

        <modal-tarefa-edicao v-model="valor"
                             :exibirModalTarefa="mostrarModalNovaTarefa"
                             :titulo=tituloModal
                             @salvarTarefa="salvarNovaTarefa"
                             @fecharModal="fecharModalNovaTarefa"/>
    </div>
</template>

<script>
    import {actionTypes, categoriasTarefas, situacoes} from '@/core/constants'
    import ModalTarefaEdicao from '@/views/pages/commons/modal-tarefa/ModalTarefaEdicao'

    export default {
        name: 'NovaTarefa',
        components: {
            ModalTarefaEdicao
        },
        $_veeValidate: {
            validator: 'new'
        },
        data() {
            return {
                mostrarModalNovaTarefa: false,
                valor: {
                    situacao: 'ABERTO'
                },
                tituloModal: 'Criar nova tarefa',
                categoriasTarefas,
                situacoes
            }
        },
        methods: {
            async salvarNovaTarefa() {
                await this.validarFormulario()
                await this.$store.dispatch(actionTypes.PROJETO.SALVAR_TAREFA, this.valor)
                this.mostrarNotificacaoSucessoDefault()
                this.fecharModalNovaTarefa()
            },
            async validarFormulario() {
                const resultado = await this.$validator._base.validateAll()
                if (!resultado)
                    throw new Error('Preencha os campos obrigatórios!')
            },
            exibirModalNovaTarefa() {
                this.mostrarModalNovaTarefa = true
            },
            fecharModalNovaTarefa() {
                this.valor = {}
                this.mostrarModalNovaTarefa = false
            }
        }
    }
</script>

<style scoped lang="stylus">
    .pr-botao-menor
        color #fff
        border-radius 2px
        padding 5px 10px
        box-sizing border-box
</style>