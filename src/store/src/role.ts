import { getRoleList } from '~/api/role'
import { IGetUserListParams } from '~/api/role/types'
import { elementUtils } from '~/global/elementUtils'

export const role = defineStore('role', () => {
  const pageTotal = ref<number>(0)
  const roleList = ref<Role.IRoleInfo[]>([])
  const pageParams = ref<IGetUserListParams>({
    pageNo: 1,
    pageSize: 20,
    orderBy: 'id',
    order: 'ASC',
    queryCondition: { id: '', role_name: '', role_alias: '' }
  })
  const fetchRoleList = async () => {
    try {
      type resType = { code: number; total: number; roleList: Role.IRoleInfo[] }
      const res: resType = await getRoleList(pageParams.value)
      roleList.value = res.roleList
      pageTotal.value = res.total
      return res.roleList
    } catch (error) {
      console.log(error)
      elementUtils.$message((<any>error)?.response?.data?.message, 'error')
      return []
    }
  }

  return {
    roleList,
    pageTotal,
    pageParams,
    fetchRoleList
  }
})
