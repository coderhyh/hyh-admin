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
          },
          {
            path: 'role-manage',
            name: 'RoleManage',
            component: () => import('~/views/system/role-manage'),
            meta: {
              name: '角色管理',
              icon: 'material-symbols:manage-accounts'
            }
          },
          {
            path: 'permission-manage',
            name: 'PermissionManage',
            component: () => import('~/views/system/permission-manage'),
            meta: {
              name: '权限管理',
              icon: 'icon-park-solid:permissions'
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
          icon: 'pixelarticons:book-open'
        }
      },
      {
        path: 'clinical-us',
        name: 'Clinical-US',
        component: () => import('~/views/clinical-us'),
        meta: {
          name: '美国临床',
          icon: 'medical-icon:i-physical-therapy'
        }
      },
      {
        path: 'clinical-eu',
        name: 'Clinical-EU',
        component: () => import('~/views/clinical-eu'),
        meta: {
          name: '欧洲临床',
          icon: 'medical-icon:i-physical-therapy'
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
