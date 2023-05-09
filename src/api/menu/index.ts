import request from '~/service'

import { ICreateMenuParams } from './types'

export const getMenuListTree = <T>() => request.get<T>({ url: '/menu/list-tree' })

export const getMenus = <T>() => request.get<T>({ url: '/menu' })

export const setMenu = <T>(data: ICreateMenuParams, isCreate = true, menuId?: number) =>
  request.request<T>({
    url: isCreate ? '/menu/create' : `/menu/${menuId}`,
    method: isCreate ? 'post' : 'patch',
    data: {
      page: data.page,
      icon: data.icon ?? null,
      status: data.status ?? 0,
      route: data.route ?? null,
      routeName: data.routeName ?? null,
      permission: data.permission ?? null,
      component: data.component ?? null,
      type: data.type,
      parentId: data.parentId === 0 || !data.parentId ? null : data.parentId,
      requiredId: data.requiredId ?? null,
      order: data.order
    }
  })
