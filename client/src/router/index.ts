import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/configure-buzzer',
    name: 'ConfigureBuzzer',
    component: () => import('../views/ConfigureBuzzerView.vue')
  },
  {
    path: '/buzzer',
    name: 'Buzzer',
    component: () => import('../views/BuzzerView.vue')
  },
  {
    path: '/host',
    name: 'Host',
    component: () => import('../views/HostView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
