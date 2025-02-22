import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Auth from '@/views/account/auth.vue'
import UserCenter from '@/views/user-center/index.vue'
import ProfileEdit from '@/views/user-center/profile-edit.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/',
      name: 'userCenter',
      component: UserCenter,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: ProfileEdit,
      meta: { requiresAuth: true }
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