import request from '~/service'

import { IGetUserListParams, IUpdateRoleParams, IUpdateRoleStatusParams } from './types'

export const getRoleList = <T>(data: IGetUserListParams) => request.post<T>({ url: '/role/list', data })

export const getRoleListSelect = <T>() => request.get<T>({ url: '/role/list-select' })

export const updateRoleInfo = <T>(data: IUpdateRoleParams) =>
  request.patch<T>({ url: `/role/${data.roleId}`, data, showLoading: true })

export const updateRoleStatus = <T>(data: IUpdateRoleStatusParams) =>
  request.patch<T>({ url: `/role/status/${data.roleId}`, data, showLoading: true })
