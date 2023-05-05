import request from '~/service'

import { ICreateUserParams, IGetUserListParams, IUpdateUserParams, IUserLoginParams } from './types'

export const createUser = <T>(data: ICreateUserParams) =>
  request.post<T>({
    url: '/user/create',
    data
  })

export const userLogin = <T>(data: IUserLoginParams) =>
  request.post<T>({
    url: '/user/login',
    data,
    showLoading: true
  })

export const getUserInfo = <T>() =>
  request.get<T>({
    url: `/user/info`
  })

export const getUserList = <T>(data: IGetUserListParams) =>
  request.post<T>({
    url: `/user/list`,
    data
  })

export const userExit = <T>() => request.delete<T>({ url: '/user/exit' })

export const deleteUser = <T>(userIds: number[]) =>
  request.delete<T>({ url: `/user/delete-users`, data: { userIds }, showLoading: true })

export const updateUserStatus = <T>(data: Pick<IUpdateUserParams, 'userId' | 'status'>) =>
  request.patch<T>({ url: `/user/status/${data.userId}`, data, showLoading: true })

export const updateUserInfo = <T>(data: IUpdateUserParams) =>
  request.patch<T>({ url: `/user/${data.userId}`, data, showLoading: true })
