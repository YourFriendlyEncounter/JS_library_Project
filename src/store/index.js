import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import User from './user'
import Article from './article'
import File from './file'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    User,
    Article,
    File
  }
})
