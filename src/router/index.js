import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../views/account/auth.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})

export default router 