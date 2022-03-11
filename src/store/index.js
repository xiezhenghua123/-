import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

let store = new Vuex.Store({
  actions,
  getters,
  modules
})

if (module.hot) {
    module.hot.accept(['./actions', './getters', './modules'], () => {
      store.hotUpdate({
        actions: require('./actions'),
        getters: require('./getters'),
        modules: require('./modules')
      })
    })
  }

export default store
