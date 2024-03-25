const temp = {
  state:{
    nowPlan: [],
  },
  mutations:{
    SET_NOW_PLAN: (state, plan) => {
      state.nowPlan = plan
    }
  },
  actions:{
    setNowPlan({ commit }, plan) {
      commit('SET_NOW_PLAN', plan)
    },
    calNowPlan({ commit }) {
      return new Promise((resolve, reject) =>{
        // TODO 预留axios请求位置
        // calPlan().then(res => {
        //   commit('SET_NOW_PLAN', res)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })

      })
    }
  }
}

export default temp;