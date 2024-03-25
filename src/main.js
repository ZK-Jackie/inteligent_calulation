import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $ from 'jquery'  //导入jquery
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'

Vue.use(ElementUI);

Vue.prototype.$echarts = echarts
Vue.prototype.$ = $   //将$(jquery)挂在到vue.prototype身上，让所有的Vue共享这个方法
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
