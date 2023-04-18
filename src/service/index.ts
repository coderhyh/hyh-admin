import { user } from '~/store/index'

import Request from './request'

const Request1 = new Request({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      const userStore = user()
      if (userStore.token) {
        config.headers!.Authorization = `Bearer ${userStore.token}`
      }
      return config
    }
  }
})

export default Request1
