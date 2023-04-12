// service统一出口
import Request from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const Request1 = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = '123'
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default Request1
