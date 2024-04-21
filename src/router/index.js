import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout/index.vue'
import FirstPage from '@/layout/components/firstPage/firstPage.vue'
import Animation from '@/layout/components/animation/animate.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => Layout,
    meta: {
      title: '智算古稀——养老保险测算平台',
      miniTitle: '平台',
    }
  },
  {

    path: '/test1',
    name: 'test1',
    component: () => import('@/views/reginInfo/index.vue'),
    meta: {
      title: '区域大屏信息',
      miniTitle: '区域',
    }

  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('@/views/reginInfo/settings/index.vue'),
    meta: {
      title: '养老测算',
      miniTitle: '参数调配',
    }
  },
  {
    path: '/test3',
    name: 'test3',
    component: () => import('@/views/PoliciesInfo/index.vue'),
    meta: {
      title: '养老政策信息',
      miniTitle: '政策概况',
    }
  },
  {
    path: '/test4',
    name: 'test4',
    component: () => import('@/views/MainScreen/index.vue'),
    meta: {
      title: '智算古稀——养老保险测算可视化平台',
      miniTitle: '首页',
    }
  },
  {
    path: '/test5',
    name: 'test5',
    component: () => import('@/views/GDProvince/index.vue'),
    meta: {
      title: '广东省区域大屏信息',
      miniTitle: '区域信息',
    }
  },
  {
    path: '/gd2',
    name: 'gd2',
    component: () => import('@/views/GDProvince/index2.vue'),
    meta: {
      title: '广东省区域大屏信息',
      miniTitle: '区域信息',
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/components/charts/graph.vue'),
    meta: {
      title: '测试专用',
      miniTitle: '测试',
    }
  },
  {
    path: '/first',
    name: '1',
    component: () => import('@/views/firstPage.vue'),
    meta: {
      title: '智算古稀——养老保险测算可视化平台',
      miniTitle: '首界面',
    }
  },

  {
    path: '/animation',
    name: 'animation',
    component: () => import('@/views/animation/animate.vue'),
    meta: {
      title: '智算古稀——养老保险测算可视化平台',
      miniTitle: '动画',
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
