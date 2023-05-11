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
      @on-reset-password="handleResetPassword"
    >
      <template #status="{ row }">
        <el-switch
          v-if="row.status !== ACCOUNT_STATUS.ADMIN"
          v-model="row.status"
          inline-prompt
          :disabled="isUpdate"
          active-text="已冻结"
          inactive-text="未冻结"
          active-color="#e47470"
          :active-value="1"
          :inactive-value="0"
          :before-change="handleSwitchChange(row)"
        />
        <el-tag v-else type="success">管理员</el-tag>
      </template>
      <template #roleGrade="{ row }">
        <el-tag>{{ row.role?.grade }}</el-tag>
      </template>
    </PageTable>
    <PageModal
      v-model:show="isShowDialog"
      v-model:form-data="modalFormData"
      :title="title"
      @on-submit="handleModalSubmit"
    >
      <template #status="{ row }">
        <el-switch
          v-if="modalFormData[row.modelValue] !== ACCOUNT_STATUS.ADMIN"
          v-model="modalFormData[row.modelValue]"
          inline-prompt
          v-bind="row.switchProps?.config"
        />
        <el-tag v-else type="success">管理员</el-tag>
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'

import { resetPassword, updateUserStatus } from '~/api/user'
import PageTable from '~/components/page-table/page-table.vue'
import { ACCOUNT_STATUS } from '~/enums'

import { formConfig, tableConfig } from './config'
import { useDeleteUser, useHandleModalClick } from './hooks'

const { fetchUserList, pageParams, userInfo } = useStore('user')
const global = getCurrentInstance()?.proxy
const pageTableRef = ref<InstanceType<typeof PageTable>>()
const curRoleGrade = computed(() => userInfo.value.role!.grade)
const isUpdate = useVerifyPermission('table', 'update')

// 检索
const handleQueryClick = () => {
  pageTableRef.value?.fetchData()
}
const handleFormDataChange = ({ id, username, nickname }: App.IDefaultObject) => {
  pageParams.value.queryCondition = { id, username, nickname }
}
// 删除用户
const [handleDeleteClick, handleBatchDelete] = useDeleteUser(pageTableRef, curRoleGrade)

// modal
const { title, isShowDialog, modalFormData, handleEditClick, handleCreateClick, handleModalSubmit } =
  useHandleModalClick({
    curRoleGrade,
    pageTableRef
  })

// 状态切换
const handleSwitchChange = (row: User.IUserInfo) => async () => {
  if (!row.id) return false
  try {
    const res = await updateUserStatus<App.IDefaultResult>({
      userId: String(row.id),
      status: <App.AccountStatus>Number(!row.status)
    })
    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    if (res.code === 200) pageTableRef.value?.fetchData()
    return res.code === 200
  } catch (err) {
    global?.$message((<any>err).response.data.message, 'error')
    return false
  }
}

// 重置密码
const handleResetPassword = async (userItem: User.IUserInfo) => {
  try {
    const res = await ElMessageBox.prompt(`请输入'${userItem.username}'的新密码`, '重置密码', {
      confirmButtonText: '提交',
      cancelButtonText: '关闭',
      inputPattern: /^[\da-zA-z_.]{6,16}$/,
      inputErrorMessage: '密码需要为6-16位的字母/数字/_/.'
    })
    console.log(res)
    const resetPwdRes = await resetPassword<App.IDefaultResult>({ userId: userItem.id, newPassword: res.value })
    global?.$message(resetPwdRes.message, resetPwdRes.code === 200 ? 'success' : 'error')
  } catch (error) {
    console.log(error)
    global?.$message((<any>error).response.data.message, 'error')
  }
}
</script>

<style scoped></style>
