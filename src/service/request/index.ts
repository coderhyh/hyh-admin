import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'
import axios from 'axios'
import NProgress from 'nprogress'

import { elementUtils } from '~/global/elementUtils'
import router from '~/router'
import { user } from '~/store'

import type { RequestConfig, RequestInterceptors } from './type'

const DEFAULT_LOADING = false
class Request {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  showLoading: boolean

  constructor(config: RequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        this.showLoading && NProgress.start()
        return config
      },
      (err: AxiosError) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        this.showLoading && NProgress.done()
        return res.data
      },
      async (err: AxiosError) => {
        const userStore = user()

        if (err.code !== 'ERR_CANCELED') this.showLoading && NProgress.done()

        switch (err.response?.status) {
          case 401:
            await userStore.logoutAction(false)
            elementUtils.$message('登录失效, 请重新登录')
            router.replace('/login')
            break
          case 403:
            console.log('权限不足')
            break
          case 404:
            console.log('request 404')
            break

          default:
            break
        }
        throw err.response?.data
      }
    )
  }

  async request<T = any>(config: RequestConfig<T>): Promise<T> {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    if (config.cancelTokenHook) {
      config.cancelToken = new axios.CancelToken((c: Canceler) => {
        config.cancelTokenHook?.(c)
      })
    }
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    try {
      let res: T = await this.instance.request<any, T>(config)
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      return res
    } catch (err: any) {
      return Promise.reject(err)
    }
  }

  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
