import Vue from 'vue'
import Vuex from 'vuex'
import kanbanRef from '@/assets/js/firebase.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentTask: null
  },
  mutations: {
    removeTask (state, payload) {
      kanbanRef.child(payload['.key']).remove()
    }
  },
  actions: {
    removeTask ({ commit }, payload) {
      commit('removeTask', payload)
    }
  }
})

export default store
