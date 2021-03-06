import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/addproduct',
    name: 'addproduct',
    component: () => import('../components/AddWine.vue')
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import('../views/Scan.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../components/Result.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
