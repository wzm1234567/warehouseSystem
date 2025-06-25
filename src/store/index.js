

import Vue from 'vue'
import Vuex from 'vuex'

// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: {
    menu:[],
    hasRouterFlag:false,
    user:null
  },
  getters: {
    getmenu(state,data){
      return state.menu 
    },
    getHasRouterFlag(state){
      return state.hasRouterFlag
    },
    getuser(state){
      return state.user
    }
  },
  mutations: {
    setmenu(state,data){
      state.menu = data
    },
    setHasRouterFlag(state,data){
      state.hasRouterFlag = data
    },
    setuser(state,data){
      state.user = data
    }
  },
  actions: {
    
  },
  modules: {
  }
})
