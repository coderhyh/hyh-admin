import NProgress from 'nprogress'
import { createRouter, createWebHistory, RouteRecordName, RouteRecordRaw } from 'vue-router'

import { elementUtils } from '~/global/elementUtils'
import { user } from '~/store'

import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

function isDescendant(parent: RouteRecordRaw, target: RouteRecordName) {
  if (parent.name === target) {
    return true
  } else if (parent.children) {
    for (let i = 0; i < parent.children.length; i++) {
      if (isDescendant(parent.children[i], target)) {
        return true
      }
    }
  }
  return false
}

router.beforeEach((to, from, next) => {
  const userStore = user()
  NProgress.start()
  if (userStore.token) {
    if (to.name === 'Login') return next(from.fullPath)
  } else if (isDescendant(routes[0], to.name!)) {
    elementUtils.$message('请登录', 'warning')
    return next('/login')
  }
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
