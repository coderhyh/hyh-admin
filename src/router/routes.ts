import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/',
    name: 'Layout',
    component: () => import('~/layout/layout.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('~/views/index'),
        meta: {
          name: '控制台',
          icon: 'clarity:dashboard-solid'
        }
      },
      {
        path: 'system',
        name: 'System',
        meta: {
          name: '系统管理',
          icon: 'mdi:cog'
        },
        children: [
          {
            path: 'user-manage',
            name: 'UserManage',
            component: () => import('~/views/system/user-manage'),
            meta: {
              name: '用户管理',
              icon: 'material-symbols:settings-account-box'
            }
          }
        ]
      },
      {
        path: 'paper',
        name: 'Paper',
        component: () => import('~/views/paper'),
        meta: {
          name: '文献',
          icon: 'clarity:dashboard-solid'
        }
      },
      {
        path: 'clinical-us',
        name: 'Clinical-US',
        component: () => import('~/views/clinical-us'),
        meta: {
          name: '美国临床',
          icon: 'clarity:dashboard-solid'
        }
      },
      {
        path: 'clinical-eu',
        name: 'Clinical-EU',
        component: () => import('~/views/clinical-eu'),
        meta: {
          name: '欧洲临床',
          icon: 'clarity:dashboard-solid'
        }
      }
    ]
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
