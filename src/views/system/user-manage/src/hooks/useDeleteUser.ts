import { Ref } from 'vue'

import { deleteUser } from '~/api/user'
import PageTable from '~/components/page-table/page-table.vue'
import { elementUtils } from '~/global/elementUtils'

export const useDeleteUser = (
  pageTableRef: Ref<InstanceType<typeof PageTable> | undefined>,
  curRoleGrade: Ref<number>
) => {
  const global = getCurrentInstance()?.proxy
  const { userInfo } = useStore('user')

  const deleteUsers = (users: number[]) =>
    useFetchTryCatch(async () => {
      const res: App.IDefaultResult = await deleteUser(users)
      global?.$message(res.message, res.code === 200 ? 'success' : 'error')
      pageTableRef.value?.fetchData()
    }).catch((err: any) => {
      global?.$message(err.response.data.message, 'error')
    })

  const handleDeleteClick = (row: User.IUserInfo) => deleteUsers([row.id])
  const handleBatchDelete = (selectUsers: User.IUserInfo[]) => {
    const res = selectUsers.filter((e) => !(curRoleGrade.value <= e.role.grade))
    if (!res.length) {
      deleteUsers(selectUsers.map((e) => e.id))
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
