import store from '@/core/store'
import router from '@/views/routers'
import loki from '@azinformatica/loki'
import Vue from 'vue'

Vue.use(loki, { router, store })
