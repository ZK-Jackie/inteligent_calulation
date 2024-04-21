import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if(from.fullPath.includes("modify") && to.fullPath.includes("regin")){
    next('gd');
    NProgress.done()
    return;
  }else{
    next();
    NProgress.done()
    return;
  }
});

router.afterEach(() => {
  NProgress.done()
})