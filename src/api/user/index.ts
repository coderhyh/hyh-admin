import request from '~/service'

import { IUserLoginParams } from './types'

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