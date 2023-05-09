import { Ref } from 'vue'

import { createRole, updateRoleInfo } from '~/api/role'
import { ICreateRole } from '~/api/role/types'
import { IFormConfig } from '~/base-ui/hyh-form'
import PageTable from '~/components/page-table/page-table.vue'

import { modalFormCreateConfig, modalFormEditConfig } from '../config'

interface IParams {
  curRoleGrade: Ref<number>
  pageTableRef: Ref<InstanceType<typeof PageTable> | undefined>
}

export const useHandleModalClick = (params: IParams) => {
  const { curRoleGrade, pageTableRef } = params
  const { title, handleType, isShowDialog, modalFormData, handleClick } = usePageModal()
  const global = getCurrentInstance()?.proxy
  const { fetchMenuListTree, menuListTree, fetchMenus } = useStore('menu')

  // 请求权限选择项
  const modalConfig: { [k in 'create' | 'edit']: IFormConfig } = {
    create: modalFormCreateConfig(<any>[], curRoleGrade.value),
    edit: modalFormEditConfig(<any>[], [], curRoleGrade.value)
  }
  onActivated(getPermissionList)
  async function getPermissionList() {
    const menuTree = await fetchMenuListTree()
    modalConfig.create = modalFormCreateConfig(menuTree, curRoleGrade.value)
  }

  // modal click
  const handleEditClick = (row: Role.IRoleInfo) => {
    const permissionList = row.permission.map((e) => e.id)
    modalConfig.edit = modalFormEditConfig(menuListTree.value, permissionList, curRoleGrade.value)
    handleClick({
      type: 'edit',
      config: modalConfig.edit,
      title: '修改角色',
      formData: {
        id: row.id,
        role_name: row.role_name,
        role_alias: row.role_alias,
        status: row.status,
        grade: row.grade,
        permissionList
      }
    })
  }
  const handleCreateClick = () => {
    // modalConfig.edit = modalFormCreateConfig(menuListTree.value, curRoleGrade.value)
    handleClick({
      type: 'create',
      config: modalConfig.create,
      title: '新建角色',
      formData: useFormDataOrigin(modalConfig.create.formDataList)
    })
  }
  const handleModalSubmit = () => {
    useFetchTryCatch(async () => {
      let res: App.IDefaultObject = {}
      if (handleType.value === 'edit') {
        const { id, role_name, role_alias, status, grade, permissionList } = modalFormData.value
        res = await updateRoleInfo({
          roleId: id,
          role_name,
          role_alias,
          status: Number(status) as 0 | 1,
          grade,
          permissionList
        })
      } else if (handleType.value === 'create') {
        res = await createRole(modalFormData.value as ICreateRole)
      }
      await fetchMenus()
      if (res.code === 200) isShowDialog.value = false
      global?.$message(res.message, res.code === 200 ? 'success' : 'error')
      pageTableRef.value?.fetchData()
    }).catch((error: any) => {
      global?.$message(error?.response?.data?.message, 'error')
    })
  }

  return {
    title,
    isShowDialog,
    modalFormData,
    handleEditClick,
    handleCreateClick,
    handleModalSubmit
  }
}
