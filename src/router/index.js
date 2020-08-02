import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    //路由级别的代码分割
    //这会为该路由生成一个单独的块(Login.[hash].js)
    //当路由被访问时延迟加载。
    component: () => import(/* webpackChunkName: "Login" */ '@/components/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Login" */ '@/components/Home.vue')
  }
]

const router = new VueRouter({
  routes
})
//为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问登录页，直接放行
  if (to.path === '/login') return next();
  // 从sessionStorage 中获取到 保存的 token 值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token，强制跳转到登录页
  if (!tokenStr) return next('login')
  next()
})

export default router
