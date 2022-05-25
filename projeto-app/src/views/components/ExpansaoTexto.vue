<template>
    <div v-resize="onResize">
        <v-tooltip bottom v-if="texto && texto.length > tamanho && tamanhoJanela.x >= 720">
            <template slot="activator">
                <span>{{ texto | az-clip-text(tamanho) }}</span>
            </template>
            <span>{{ texto }}</span>
        </v-tooltip>
        <span v-else>{{ texto }}</span>
    </div>
</template>

<script>
    export default {
        name: 'ExpansaoTexto',
        props: ['tamanho', 'texto'],
        data() {
            return {
                tamanhoJanela: {
                    x: 0,
                    y: 0
                }
            }
        },
        mounted () {
            this.onResize()
        },
        methods: {
            onResize () {
                this.tamanhoJanela = {
                    x: window.innerWidth,
                    y: window.innerHeight
                }
            }
        }
    }
</script>

<style scoped>

</style>