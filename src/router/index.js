import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => Layout,
        meta: {
          title: '智算古稀——养老保险测算平台',
          miniTitle: '平台',
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/test1',
        name: 'test1',
        component: () => import('@/views/reginInfo/index.vue'),
        meta: {
          title: '区域大屏信息',
          miniTitle: '区域',
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/test2',
        name: 'test2',
        component: () => import('@/views/reginInfo/settings/index.vue'),
        meta: {
          title: '区域大屏信息',
          miniTitle: '区域',
        }
      }
    ]
  }, {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/test3',
        name: 'test3',
        component: () => import('@/views/PoliciesInfo/index.vue'),
        meta: {
          title: '政策信息',
          miniTitle: '政策',
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/test4',
        name: 'test4',
        component: () => import('@/views/MainScreen/index.vue'),
        meta: {
          title: '智算古稀——养老保险测算平台',
          miniTitle: '主屏',
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/test5',
        name: 'test5',
        component: () => import('@/views/GDProvince/index.vue'),
        meta: {
          title: '广东省区域大屏信息',
          miniTitle: '广东省',
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/reginInfo/settings/index.vue'),
        meta: {
          title: '测试专用',
          miniTitle: '测试',
        }
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
