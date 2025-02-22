import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/account/auth.vue'
import Home from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      meta: { guest: true }
    }
  ]
})

// 修改路由守卫逻辑
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 如果需要认证且没有token
  if (to.meta.requiresAuth && !token) {
    next('/auth')
    return
  }
  
  // 如果是访客页面且已有token
  if (to.meta.guest && token) {
    next('/')
    return
  }
  
  next()
})

export default router 