import request from '~/service'

import { IGetUserListParams, IUserLoginParams } from './types'

export const userLogin = <T>(data: IUserLoginParams) =>
  request.post<T>({
    url: '/user/login',
    data,
    showLoading: true
  })

export const getUserInfo = <T>() =>
  request.post<T>({
    url: `/user/info`
  })

export const getUserList = <T>(data: IGetUserListParams) =>
  request.post<T>({
    url: `/user/list`,
    data
  })

export const userExit = <T>() => request.delete<T>({ url: '/user/exit' })
