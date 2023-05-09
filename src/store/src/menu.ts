import { RouteRecordRaw } from 'vue-router'

import { getMenuListTree, getMenus } from '~/api/menu'
import { elementUtils } from '~/global/elementUtils'
import router from '~/router'

export const menu = defineStore('menu', () => {
  const defaultMenus = [
    {
      path: '',
      name: 'Index',
      component: () => import('~/views/index'),
      meta: {
        name: '控制台',
        icon: 'clarity:dashboard-solid'
      }
    }
  ]
  const menus = ref<RouteRecordRaw[]>(defaultMenus)
  const menuListTree = ref<Menu.IMenuListTree[]>([])

  const removeRouteList = ref<Function[]>([])
  const routeAllPathToCompMap = Object.entries(import.meta.glob(`~/views/**/index.ts`))

  const fetchMenuListTree = async () => {
    try {
      const res = await getMenuListTree<{ code: number; menuTree: Menu.IMenuListTree[] }>()
      menuListTree.value = res.menuTree
      return res.menuTree
    } catch (error) {
      elementUtils.$message((<any>error)?.response?.data?.message, 'error')
      return []
    }
  }

  const fetchMenus = async () =>
    useFetchTryCatch(async () => {
      const res = await getMenus<{ code: number; menu: Menu.IMenuListTree[] }>()
      const routes = createRoutesFromMenu(res.menu)
      menus.value = [...defaultMenus, ...routes]
      addRoute()
    })

  const addRoute = () => {
    menus.value.forEach((route) => removeRouteList.value.push(router.addRoute('Layout', route)))
  }

  const removeRoute = () => {
    removeRouteList.value.forEach((removeRoute) => removeRoute())
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
          icon: item.icon,
          type: item.type
        },
        children: isChildren ? createRoutesFromMenu(item.children) : []
      }
      routes.push(route)
    })
    return routes
  }

  return { menus, menuListTree, removeRoute, fetchMenus, fetchMenuListTree }
})
