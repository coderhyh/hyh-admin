import request from '~/service'

export const getMenuListTree = <T>() => request.get<T>({ url: '/menu/list-tree' })

export const getMenus = <T>() => request.get<T>({ url: '/menu' })
