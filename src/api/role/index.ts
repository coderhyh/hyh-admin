import request from '~/service'

import { ICreateRole, IGetRoleListParams, IUpdateRoleParams, IUpdateRoleStatusParams } from './types'

export const createRole = <T>(data: ICreateRole) => request.post<T>({ url: '/role/create', data, showLoading: true })

export const getRoleList = <T>(data: IGetRoleListParams) => request.post<T>({ url: '/role/list', data })

export const getRoleListSelect = <T>() => request.get<T>({ url: '/role/list-select' })

export const updateRoleInfo = <T>(data: IUpdateRoleParams) =>
  request.patch<T>({ url: `/role/${data.roleId}`, data, showLoading: true })

export const updateRoleStatus = <T>(data: IUpdateRoleStatusParams) =>
  request.patch<T>({ url: `/role/status/${data.roleId}`, data, showLoading: true })

export const deleteRole = <T>(roleIds: number[]) =>
  request.delete<T>({ url: `/role/delete-role`, data: { roleIds }, showLoading: true })
