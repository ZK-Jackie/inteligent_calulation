import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import FirstPage from '@/layout/firstPage/firstPage.vue'
import Animation from '@/layout/animation/animate.vue'

const routes = [
  {
    path: '/nation',
    name: 'nation',
    component: () => import('@/views/MainScreen/index.vue'),
    meta: {
      title: '智算古稀——养老保险测算可视化平台',
      miniTitle: '首页',
      hidden: false,
      reload: false
    }
  },
  {
    path: '/policy',
    name: 'policy',
    component: () => import('@/views/PoliciesInfo/index.vue'),
    meta: {
      title: '养老政策信息',
      miniTitle: '政策概况',
      hidden: false,
      reload: false
    }
  },
  {
    path: '/regin',
    name: 'regin',
    component: () => import('@/views/GDProvince/index.vue'),
    meta: {
      title: '广东省区域大屏信息',
      miniTitle: '区域信息',
      hidden: false,
      reload: true
    }
  },
  {
    path: '/modify',
    name: 'modify',
    component: () => import('@/views/ParamSetting/index.vue'),
    meta: {
      title: '养老测算',
      miniTitle: '参数调配',
      hidden: false,
      reload: true
    }
  },
  {
    path: '/gd',
    name: 'gd',
    component: () => import('@/views/GDProvince/index2.vue'),
    meta: {
      title: '广东省区域大屏信息',
      miniTitle: '区域信息',
      hidden: true,
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/components/charts/graph.vue'),
    meta: {
      title: '测试专用',
      miniTitle: '测试',
      hidden: true
    }
  },
  {
    path: '/first',
    name: '1',
    component: () => import('@/views/firstPage.vue'),
    meta: {
      title: '智算古稀——养老保险测算可视化平台',
      miniTitle: '首界面',
      hidden: true
    }
  },

  {
    path: '/animation',
    name: 'animation',
    component: () => import('@/views/animation/animate.vue'),
    meta: {
      title: '智算古稀——养老保险测算可视化平台',
      miniTitle: '动画',
      hidden: true
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
