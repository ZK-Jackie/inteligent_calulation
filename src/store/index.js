import Vue from 'vue'
import Vuex from 'vuex'
import screen from "./modules/screen"
import temp from "./modules/temp"
import getters from "./getters"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    screen,
    temp
  },
  getters,
})

export default store