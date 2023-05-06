import request from '~/service'

export const getPermissionListSelect = <T>() => request.get<T>({ url: '/menu/list-tree' })
