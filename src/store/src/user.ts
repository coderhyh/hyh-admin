import { getUserInfo, getUserList, userExit, userLogin } from '~/api/user'
import { IGetUserListParams, IUserLoginParams } from '~/api/user/types'
import { elementUtils } from '~/global/elementUtils'

import { defaultTab } from './layout'

export const user = defineStore(
  'user',
  () => {
    const { tabs } = useStore('layout')
    const { removeRoute, fetchMenus } = useStore('menu')
    const token = ref<string>()
    const userInfo = ref<Partial<User.IUserInfo>>({})

    const loginAction = async (user: IUserLoginParams) =>
      useFetchTryCatch(async () => {
        const res = await userLogin<User.IUserLoginSuccess>(user)
        token.value = res.token
        userInfo.value = res.userInfo
        return fetchMenus()
      })

    const logoutAction = async (flag = true) =>
      useFetchTryCatch(async () => {
        flag && (await userExit<User.IUserExit>())
        tabs.value = [defaultTab]
        userInfo.value = {}
        token.value = ''
        removeRoute()
      })

    const getUserInfoAction = async () =>
      useFetchTryCatch(async () => {
        const res = await getUserInfo<{ code: number; userInfo: User.IUserInfo }>()
        userInfo.value = res.userInfo
      })
    // .catch((err) => {
    //   elementUtils.$message((<any>err)?.response?.data?.message, 'error')
    // })

    const userList = ref<User.IUserInfo[]>([])
    const pageParams = ref<IGetUserListParams>({
      pageNo: 1,
      pageSize: 20,
      orderBy: 'id',
      order: 'ASC',
      queryCondition: { id: '', username: '', nickname: '' }
    })
    const pageTotal = ref(0)
    const fetchUserList = async () => {
      try {
        type resType = { code: number; total: number; userList: User.IUserInfo[] }
        const res: resType = await getUserList(pageParams.value)
        userList.value = res.userList
        pageTotal.value = res.total
        return res.userList
      } catch (error) {
        console.log(error)
        elementUtils.$message((<any>error)?.response?.data?.message, 'error')
        return []
      }
    }

    return {
      token,
      userInfo,
      loginAction,
      logoutAction,
      getUserInfoAction,
      userList,
      pageParams,
      pageTotal,
      fetchUserList
    }
  },
  {
    persist: { paths: ['token', 'userInfo'] }
  }
)
