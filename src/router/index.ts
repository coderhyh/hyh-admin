import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

import { elementUtils } from '~/global/elementUtils'
import { user } from '~/store'

import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const userStore = user()
  NProgress.start()
  if (userStore.token) {
    if (to.name === 'Login') {
      return next('/')
    }
  } else if (routes[0].children?.some((e) => to.name === e.name)) {
    elementUtils.$message('请登录', 'warning')
    return next('/login')
  }
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
