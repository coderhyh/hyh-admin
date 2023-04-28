<template>
  <div class="user-manage">
    <PageForm :form-config="formConfig" @query-click="handleQueryClick" @form-data-change="handleFormDataChange" />
    <PageTable
      ref="pageTableRef"
      mt-20px
      page-type="user"
      :table-config="tableConfig"
      :automatic-request-fn="fetchUserList"
      is-show-more
      @on-delete-click="handleDeleteClick"
      @on-edit-click="handleEditClick"
      @on-create-click="handleCreateClick"
      @on-batch-delete="handleBatchDelete"
    >
      <template #roleGrade="{ row }">
        <el-tag>{{ row.role?.grade }}</el-tag>
      </template>
    </PageTable>
    <PageModal
      v-model:show="isShowDialog"
      v-model:form-data="modalFormData"
      :title="title"
      @on-submit="handleModalSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { getRoleListSelect } from '~/api/role'
import { createUser, deleteUser, updateUserInfo } from '~/api/user'
import { IFormConfig } from '~/base-ui/hyh-form'
import PageTable from '~/components/page-table/page-table.vue'
import { elementUtils } from '~/global/elementUtils'

import { formConfig, modalFormCreateConfig, modalFormEditConfig, tableConfig } from './config'

const { title, handleType, isShowDialog, modalFormData, handleClick } = usePageModal()

const { fetchUserList, pageParams, userInfo } = useStore('user')
const global = getCurrentInstance()?.proxy
const pageTableRef = ref<InstanceType<typeof PageTable>>()
const curRoleGrade = computed(() => userInfo.value.role!.grade)

// 检索
const handleQueryClick = () => {
  pageTableRef.value?.fetchData()
}
const handleFormDataChange = ({ id, username, nickname }: App.IDefaultObject) => {
  pageParams.value.queryCondition = { id, username, nickname }
}

// 请求角色选择项
const modalConfig: { [k in 'create' | 'edit']: IFormConfig } = {
  create: modalFormCreateConfig([], curRoleGrade.value),
  edit: modalFormEditConfig([], curRoleGrade.value)
}
let roleOptions: App.ISelectOption[] = []
onActivated(getRoleOptions)
function getRoleOptions() {
  getRoleListSelect<{ code: number; roleListSelect: Role.IRoleListSelect[] }>().then((res) => {
    roleOptions =
      res?.roleListSelect.map((e) => ({
        label: String(e.role_name),
        value: e.id,
        disabled: Boolean(e.status)
      })) ?? []
    modalConfig.create = modalFormCreateConfig(roleOptions, curRoleGrade.value)
    modalConfig.edit = modalFormEditConfig(roleOptions, curRoleGrade.value)
  })
}

// 删除用户
const deleteUsers = (users: number[]) =>
  useFetchTryCatch(async () => {
    const res: App.IDefaultResult = await deleteUser(users)
    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    pageTableRef.value?.fetchData()
  }).catch((err: any) => {
    global?.$message(err.response.data.message, 'error')
  })

const handleDeleteClick = async (row: User.IUserInfo) => deleteUsers([row.id])
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

// modal
const handleEditClick = (row: User.IUserInfo) => {
  modalConfig.edit = modalFormCreateConfig(roleOptions, curRoleGrade.value)

  handleClick({
    type: 'edit',
    config: modalConfig.edit,
    title: '修改用户',
    formData: {
      id: row.id,
      username: row.username,
      nickname: row.nickname,
      role: row.role.id
    }
  })
}
const handleCreateClick = () => {
  modalConfig.edit = modalFormEditConfig(roleOptions, curRoleGrade.value)
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
    if (res.code === 200) isShowDialog.value = false

    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    pageTableRef.value?.fetchData()
  }).catch((error: any) => {
    global?.$message(error?.response?.data?.message, 'error')
  })
}
</script>

<style scoped></style>
