<template>
    <v-form class="az-form-content mt-0">
        <v-container fluid grid-list-xl white>
            <h3 class="pr-titulo">Informações</h3>

            <v-layout wrap align-center white>
                <v-flex xs12 sm12>
                    <v-text-field label="Nome"
                                  name="Nome"
                                  :error-messages="errors.collect('Nome')"
                                  placeholder="Digite o nome"
                                  v-model="dadosGerais.nome"
                                  v-validate="'required'"
                                  maxlength="100"/>
                </v-flex>
                <v-flex xs12 sm12>
                    <v-textarea name="Descrição"
                                label="Descrição"
                                v-model="dadosGerais.descricao"
                                rows="2"
                                placeholder="Digite a descrição"
                                maxlength="500"/>
                </v-flex>
                <v-flex xs12 sm3>
                    <az-date date-time
                             v-model="dadosGerais.dataHoraInicial"
                             label="Data/Hora Inicial"
                             name-date="Data Inicial"
                             name-hour="Hora Inicial"
                             is-required/>
                </v-flex>
                <v-flex xs12 sm3>
                    <az-date date-time
                             v-model="dadosGerais.dataHoraFinal"
                             label="Data/Hora Final"
                             name-date="Data Final"
                             name-hour="Hora Final"
                             is-required/>
                </v-flex>
                <v-flex xs12 sm3>
                    <az-combo-enum name="Categoria"
                                   label="Categoria"
                                   placeholder="Selecione"
                                   v-model="dadosGerais.categoria"
                                   is-required
                                   :enum-object="categoriasProjetos"/>
                </v-flex>
                <v-flex xs12 sm3>
                    <az-combo-enum name="Situação"
                                   label="Situação"
                                   placeholder="Selecione"
                                   v-model="dadosGerais.situacao"
                                   is-required
                                   :enum-object="situacoes"/>
                </v-flex>
            </v-layout>

            <div class="az-actions-form pr-acoes-formulario">
                <botao-voltar @voltar="tratarEventoVoltar"/>
                <botao-salvar-avancar @salvarEAvancar="tratarEventoSalvarEAvancar"/>
            </div>
        </v-container>
    </v-form>
</template>

<script>
    import {actionTypes, categoriasProjetos, situacoes} from '@/core/constants'

    export default {
        name: 'DadosGeraisEdicao',
        $_veeValidate: {
            validator: 'new'
        },
        data() {
            return {
                dadosGerais: {},
                projetoId: null,
                rotasAvancar: ['TarefasEdicao'],
                categoriasProjetos,
                situacoes
            }
        },
        async beforeRouteLeave(to, from, next) {
            if (this.verificarRotaAvancar(to.name)) {
                try {
                    await this.validarDadosFormulario()
                } catch (e) {
                    this.mostrarNotificacaoErro(e.message)
                }
            } else {
                next()
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
            async tratarEventoSalvarEAvancar() {
                await this.validarDadosFormulario()
                this.setMensagemLoading('Salvando o projeto...')
                await this.$store.dispatch(actionTypes.PROJETO.SALVAR_DADOS_GERAIS, this.dadosGerais)
                this.mostrarNotificacaoSucessoDefault()
                this.redirecionarParaProximaPagina()
            },
            async validarDadosFormulario() {
                const estaValidado = await this.$validator._base.validateAll()
                if (!estaValidado) {
                    throw new Error('Preencha os campos obrigatórios.')
                }
            },
            setProjetoId() {
                this.projetoId = this.$route.params.id
            },
            tratarEventoVoltar() {
                this.$router.push({name: this.$store.state.comum.rota.origem})
            },
            redirecionarParaProximaPagina() {
                this.$router.push({name: 'TarefasEdicao', params: this.projetoId})
            },
            verificarRotaAvancar(rotaDestino) {
                return this.rotasAvancar.some(rota => {
                    return rota.name === rotaDestino
                })
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>