import { getUserList } from '~/api/user'

export const role = defineStore('role', () => {
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
    userList,
    fetchUserList
  }
})
