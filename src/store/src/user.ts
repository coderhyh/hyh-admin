import { getUserInfo, getUserList, userExit, userLogin } from '~/api/user'
import { IUserLoginParams } from '~/api/user/types'

import { defaultTab } from './layout'

export const user = defineStore(
  'user',
  () => {
    const { tabs } = useStore('layout')
    const token = ref<string>()
    const userInfo = ref<Partial<User.IUserInfo>>({})

    const loginAction = async (user: IUserLoginParams) => {
      await useFetchTryCatch(async () => {
        const res = await userLogin<User.IUserLoginSuccess>(user)
        token.value = res.token
        userInfo.value = res.userInfo
      })
    }

    const logoutAction = async (flag = true) => {
      await useFetchTryCatch(async () => {
        flag && (await userExit<User.IUserExit>())
        tabs.value = [defaultTab]
        userInfo.value = {}
        token.value = ''
      })
    }

    const getUserInfoAction = async () => {
      await useFetchTryCatch(async () => {
        const res = await getUserInfo<{ code: number; userInfo: User.IUserInfo }>()
        userInfo.value = res.userInfo
      })
    }

    const userList = ref<User.IUserInfo[]>([])
    const fetchUserList = async (page?: { currentPage: number; pageSize: number }) => {
      try {
        const res: { code: number; total: number; userList: User.IUserInfo[] } = await getUserList({
          pageNo: page?.currentPage ?? 1,
          pageSize: page?.pageSize ?? 20
        })
        userList.value = res.userList
        return [res.total, res.userList]
      } catch (error) {
        console.log(error)
        return [0, []]
      }
    }

    return {
      token,
      userInfo,
      loginAction,
      logoutAction,
      getUserInfoAction,
      userList,
      fetchUserList
    }
  },
  {
    persist: { paths: ['token', 'userInfo'] }
  }
)
