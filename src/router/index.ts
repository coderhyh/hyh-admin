import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  // NProgress.start()
  next()
})
router.afterEach((to, from) => {
  // NProgress.done()
})

export default router
