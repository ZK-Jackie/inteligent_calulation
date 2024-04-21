import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false})

let timer;//定时器变量

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

//首界面跳转到任一界面的过场动画配置
router.beforeEach((to, from, next) => {
  NProgress.start();

  clearTimeout(timer);

  if (from.fullPath === '/first' && to.fullPath === '/nation') {

    next({ path: '/animation' });

    // 设置定时器，5秒后跳转
    timer = setTimeout(() => {
      router.push('/nation');
    }, 3000);
  } else  if (from.fullPath === '/first' && to.fullPath === '/regin') {

    next({ path: '/animation' });

    // 设置定时器，5秒后跳转
    timer = setTimeout(() => {
      router.push('/regin');
    }, 3000);
  } else  if (from.fullPath === '/first' && to.fullPath === '/policy') {

    next({ path: '/animation' });

    // 设置定时器，5秒后跳转
    timer = setTimeout(() => {
      router.push('/policy');
    }, 3000);
  } else  if (from.fullPath === '/first' && to.fullPath === '/modify') {

    next({ path: '/animation' });

    // 设置定时器，5秒后跳转
    timer = setTimeout(() => {
      router.push('/modify');
    }, 3000);
  } else {
    next();
  }

  NProgress.done();
});

router.afterEach(() => {
  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})

