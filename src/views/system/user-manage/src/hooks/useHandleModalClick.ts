import { Ref } from 'vue'

import { getRoleListSelect } from '~/api/role'
import { createUser, updateUserInfo } from '~/api/user'
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

  const modalConfig: { [k in 'create' | 'edit']: IFormConfig } = {
    create: modalFormCreateConfig([], curRoleGrade.value),
    edit: modalFormEditConfig([], curRoleGrade.value)
  }
  // 请求角色选择项
  let roleOptions: App.ISelectOption[] = []
  onActivated(getRoleOptions)
  function getRoleOptions() {
    getRoleListSelect<{ code: number; roleListSelect: Role.IRoleListSelect[] }>().then((res) => {
      roleOptions =
        res?.roleListSelect.map((e) => ({
          label: String(e.role_name),
          value: e.id,
          disabled: e.status === 1
        })) ?? []
      modalConfig.create = modalFormCreateConfig(roleOptions, curRoleGrade.value)
      modalConfig.edit = modalFormEditConfig(roleOptions, curRoleGrade.value)
    })
  }
  // modal事件
  const handleEditClick = (row: User.IUserInfo) => {
    modalConfig.edit = modalFormEditConfig(roleOptions, curRoleGrade.value)
    handleClick({
      type: 'edit',
      config: modalConfig.edit,
      title: '修改用户',
      formData: {
        id: row.id,
        username: row.username,
        nickname: row.nickname,
        role: row.role.id,
        status: row.status
      }
    })
  }
  const handleCreateClick = () => {
    modalConfig.edit = modalFormCreateConfig(roleOptions, curRoleGrade.value)

    handleClick({
      type: 'create',
      config: modalConfig.create,
      title: '新建用户',
      formData: useFormDataOrigin(modalConfig.create.formDataList)
    })
  }

  const handleModalSubmit = async () => {
    useFetchTryCatch(async () => {
      let res: App.IDefaultObject = {}
      if (handleType.value === 'edit') {
        const { id, username, nickname, role, status } = modalFormData.value
        res = await updateUserInfo({ userId: id, username, nickname, role, status })
      } else if (handleType.value === 'create') {
        const { username, password, nickname, role } = modalFormData.value
        res = await createUser({ username, password, nickname, role })
      }
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
