import { RouteRecordName, RouteRecordRaw } from 'vue-router'

import { getMenus } from '~/api/menu'
import router from '~/router'

export const menu = defineStore('menu', () => {
  const menus = ref<RouteRecordRaw[]>([
    {
      path: '',
      name: 'Index',
      component: () => import('~/views/index'),
      meta: {
        name: '控制台',
        icon: 'clarity:dashboard-solid'
      }
    }
  ])
  const removeRouteList = ref<Function[]>([])
  const routeAllPathToCompMap = Object.entries(import.meta.glob(`~/views/**/index.ts`))

  const fetchMenus = async () => {
    const res = await getMenus<{ code: number; menu: Menu.IMenuListTree[] }>()
    const routes = createRoutesFromMenu(res.menu)
    menus.value.push(...routes)
    addRoute()
  }

  const addRoute = () => {
    menus.value.forEach((route) => removeRouteList.value.push(router.addRoute('Layout', route)))
    console.log(router.getRoutes())
  }

  const removeRoute = () => {
    removeRouteList.value.forEach((removeRoute) => removeRoute())
    console.log(router.getRoutes())
  }

  function createRoutesFromMenu(menuItems: Menu.IMenuListTree[]) {
    const routes: RouteRecordRaw[] = []
    menuItems.forEach((item) => {
      const isChildren = item.type === 'directory' && item.children.length

      const route: RouteRecordRaw = {
        path: item.route,
        name: item.routeName,
        component: routeAllPathToCompMap.find(([path]) => path.includes(item.component))?.[1],
        meta: {
          name: item.page,
          icon: item.icon
        },
        children: isChildren ? createRoutesFromMenu(item.children) : []
      }
      routes.push(route)
    })
    return routes
  }

  return { menus, removeRoute, fetchMenus }
})
