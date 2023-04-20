import { getUserInfo, userExit, userLogin } from '~/api/user'
import { IUserLoginParams } from '~/api/user/types'

import { defaultTab } from './layout'

export const user = defineStore(
  'user',
  () => {
    const { tabs } = useStore('layout')
    const token = ref<string>()
    const userInfo = ref<Partial<User.IUserInfo>>({})

    const loginAction = async (user: IUserLoginParams) => {
      try {
        const res = await userLogin<User.IUserLoginSuccess>(user)
        token.value = res.token
        userInfo.value = res.userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const logoutAction = async (flag = true) => {
      try {
        flag && (await userExit<User.IUserExit>())
        tabs.value = [defaultTab]
        userInfo.value = {}
        token.value = ''
      } catch (error) {
        console.log(error)
      }
    }

    const getUserInfoAction = async () => {
      try {
        const res = await getUserInfo<{ code: number; userInfo: User.IUserInfo }>()
        userInfo.value = res.userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return {
      token,
      userInfo,
      loginAction,
      logoutAction,
      getUserInfoAction
    }
  },
  {
    persist: true
  }
)
