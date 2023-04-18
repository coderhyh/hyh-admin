import { getUserInfo, userLogin } from '~/api/user'
import { IUserLoginParams } from '~/api/user/types'

export const user = defineStore(
  'user',
  () => {
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

    const logoutAction = async () => {
      userInfo.value = {}
      token.value = ''
    }

    const getUserInfoAction = async () => {
      try {
        const res = await getUserInfo<{ code: number; userInfo: User.IUserInfo }>(userInfo.value.id!)
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
