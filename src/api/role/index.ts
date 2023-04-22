import request from '~/service'

export const getRoleList = <T>() => request.get<T>({ url: '/role/list' })

export const getRoleTypeList = <T>() => request.get<T>({ url: '/role/typeList' })
