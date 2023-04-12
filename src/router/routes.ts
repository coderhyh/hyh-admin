import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/',
    name: 'Layout',
    component: () => import('~/layout/layout.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('~/views/index'),
        meta: {}
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/views/notFound/notFound.vue')
  }
]
