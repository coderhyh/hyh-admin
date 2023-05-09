import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('~/layout/layout.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/views/login')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/views/notFound/notFound.vue')
  }
]

// {
//   path: 'clinical-us',
//   name: 'Clinical-US',
//   component: () => import('~/views/clinical-us'),
//   meta: {
//     name: '美国临床',
//     icon: 'medical-icon:i-physical-therapy'
//   }
// },
// {
//   path: 'clinical-eu',
//   name: 'Clinical-EU',
//   component: () => import('~/views/clinical-eu'),
//   meta: {
//     name: '欧洲临床',
//     icon: 'medical-icon:i-physical-therapy'
//   }
// }
