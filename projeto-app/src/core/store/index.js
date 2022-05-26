import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/core/store/actions'
import getters from '@/core/store/getters'
import mutations from '@/core/store/mutations'
import state from '@/core/store/state'

Vue.use(Vuex)

export default new Vuex.Store({ actions, getters, mutations, state })
