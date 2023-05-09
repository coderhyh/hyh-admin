import { Ref } from 'vue'

import { deleteRole } from '~/api/role'
import PageTable from '~/components/page-table/page-table.vue'
import { elementUtils } from '~/global/elementUtils'

export const useDeleteRole = (
  pageTableRef: Ref<InstanceType<typeof PageTable> | undefined>,
  curRoleGrade: Ref<number>
) => {
  const global = getCurrentInstance()?.proxy
  const { userInfo } = useStore('user')

  const deleteRoles = (roles: number[]) =>
    useFetchTryCatch(async () => {
      const res: App.IDefaultResult = await deleteRole(roles)
      global?.$message(res.message, res.code === 200 ? 'success' : 'error')
      pageTableRef.value?.fetchData()
    }).catch((err: any) => {
      const msg = `
        ${err.response.data.message} <br />
        ID: ${err.response.data.roleIds?.join(', ')}
      `
      elementUtils?.$messageBox(msg)
    })

  const handleDeleteClick = (row: Role.IRoleInfo) => deleteRoles([row.id])
  const handleBatchDelete = (selectRoles: Role.IRoleInfo[]) => {
    const res = selectRoles.filter((e) => !(curRoleGrade.value <= e.grade))
    if (!res.length) {
      deleteRoles(selectRoles.map((e) => e.id))
    } else {
      const msg = `
        有选择项级别权限不足:无法操作 <br />
        当前角色级别: ${userInfo.value.role?.grade}
      `
      elementUtils.$messageBox(msg)
    }
  }

  return <const>[handleDeleteClick, handleBatchDelete]
}
