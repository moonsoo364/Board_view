import Vue from 'vue'
import Vuex from 'vuex'

import {userStore} from './module/userStore'
import {boardStore} from './module/boardStore'


Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    userStore,
    boardStore
  }
})
