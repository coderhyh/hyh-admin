<template>
  <div class="user-manage">
    <PageForm :form-config="formConfig" @query-click="handleQueryClick" />
    <PageTable
      ref="pageTableRef"
      mt-20px
      :table-config="tableConfig"
      :fetch-fn="fetchUserList"
      @on-delete-click="handleDeleteClick"
      @on-edit-click="handleEditClick"
      @on-create-click="handleCreateClick"
      @on-batch-delete="handleBatchDelete"
    />
    <PageModal
      v-model:show="isShowDialog"
      v-model:form-data="modalFormData"
      :title="title"
      @on-submit="handleModalSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { getRoleTypeList } from '~/api/role'
import { createUser, deleteUser, updateUserInfo } from '~/api/user'
import { IFormConfig } from '~/base-ui/hyh-form'
import PageTable from '~/components/page-table/page-table.vue'

import { formConfig, modalFormCreateConfig, modalFormEditConfig, tableConfig } from './config'

const { title, handleType, isShowDialog, modalFormData, handleClick } = usePageModal()

const { fetchUserList } = useStore('user')

// 检索
const handleQueryClick = (formData: App.IDefaultObject) => {
  pageTableRef.value?.fetchData((page) => fetchUserList({ ...page, queryCondition: <any>formData }))
}

// 请求角色
const modalConfig: { [k in 'create' | 'edit']: IFormConfig } = {
  create: modalFormCreateConfig([]),
  edit: modalFormEditConfig([])
}
getRoleTypeList<{ code: number; roleTypeList: Role.IRoleTypeList[] }>().then((res) => {
  const options = res.roleTypeList.map((e) => ({ label: String(e.role_name), value: String(e.id) }))
  modalConfig.create = modalFormCreateConfig(options)
  modalConfig.edit = modalFormEditConfig(options)
})

// 删除用户
const deleteUsers = (users: string[]) =>
  useFetchTryCatch(async () => {
    const res: App.IDefaultResult = await deleteUser(users)
    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    pageTableRef.value?.fetchData()
  }).catch((err: any) => {
    global?.$message(err.response.data.message, 'error')
  })

const pageTableRef = ref<InstanceType<typeof PageTable>>()
const global = getCurrentInstance()?.proxy
const handleDeleteClick = async (row: User.IUserInfo) => deleteUsers([String(row.id)])
const handleBatchDelete = (selectUsers: User.IUserInfo[]) => deleteUsers(selectUsers.map((e) => `${e.id}`))

// modal
const handleEditClick = (row: User.IUserInfo) => {
  handleClick({
    type: 'edit',
    config: modalConfig.edit,
    title: '修改用户',
    formData: {
      id: String(row.id),
      username: row.username,
      nickname: row.nickname,
      role: String(row.role.id)
    }
  })
}
const handleCreateClick = () => {
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
      const { id, username, nickname, role } = modalFormData.value
      res = await updateUserInfo({ userId: id, username, nickname, role })
    } else if (handleType.value === 'create') {
      const { username, password, nickname, role } = modalFormData.value
      res = await createUser({ username, password, nickname, role })
    }

    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    pageTableRef.value?.fetchData()
  })
}
</script>

<style scoped></style>
