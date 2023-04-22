import { getRoleList } from '~/api/role'

export const role = defineStore('role', () => {
  const roleList = ref<Role.IRoleList[]>([])
  const roleListTotal = ref<number>(0)

  const fetchRoleList = async () => {
    try {
      const res = await getRoleList<{ code: number; total: number; roleList: Role.IRoleList[] }>()
      console.log(res)
      roleList.value = res.roleList
      roleListTotal.value = res.total
    } catch (error) {
      console.log(error)
    }
  }

  return {
    roleList,
    roleListTotal,
    fetchRoleList
  }
})
