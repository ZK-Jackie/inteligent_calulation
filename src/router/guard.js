import router from './index'

const modifier = '/test2'
const gd = '/test5'
const gd2 = '/gd2'

router.beforeEach((to, from, next) => {
  if (to.path === gd && from.path === modifier) {
    next({ path: gd2 })
  }
})