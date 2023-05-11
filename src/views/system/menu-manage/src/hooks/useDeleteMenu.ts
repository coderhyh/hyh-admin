import { Ref } from 'vue'

import { deleteMenu } from '~/api/menu'
import PageTable from '~/components/page-table/page-table.vue'

export const useDeleteMenu = (pageTableRef: Ref<InstanceType<typeof PageTable> | undefined>) => {
  const global = getCurrentInstance()?.proxy
  const { fetchMenus } = useStore('menu')

  const deleteRoles = (roles: number[]) =>
    useFetchTryCatch(async () => {
      const res: App.IDefaultResult = await deleteMenu(roles)
      global?.$message(res.message, res.code === 200 ? 'success' : 'error')
      pageTableRef.value?.fetchData()
      await fetchMenus()
    })

  const handleDeleteClick = (row: Role.IRoleInfo) => deleteRoles([row.id])
  const handleBatchDelete = (selectRoles: Role.IRoleInfo[]) => {
    deleteRoles(selectRoles.map((e) => e.id))
  }

  return <const>[handleDeleteClick, handleBatchDelete]
}
