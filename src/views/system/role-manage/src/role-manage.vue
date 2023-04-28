<template>
  <div class="role-manage">
    <PageForm :form-config="formConfig" @query-click="handleQueryClick" @form-data-change="handleFormDataChange" />
    <PageTable
      ref="pageTableRef"
      page-type="role"
      mt-20px
      :automatic-request-fn="fetchRoleList"
      :table-config="tableConfig"
      edit-text="编辑权限"
      @on-edit-click="handleEditClick"
      @on-delete-click="handleDeleteClick"
      @on-batch-delete="handleBatchDelete"
      @on-create-click="handleCreateClick"
    >
      <template #status="{ row }">
        <el-switch
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
      </template>
      <template #grade="{ row }">
        <el-tag>{{ row.grade }}</el-tag>
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
import { updateRoleStatus } from '~/api/role'
import PageTable from '~/components/page-table/page-table.vue'

import { formConfig, tableConfig } from './config'
import { useDeleteRole, useHandleModalClick } from './hooks'

const { fetchRoleList, pageParams } = useStore('role')
const { userInfo } = useStore('user')
const global = getCurrentInstance()?.proxy
const pageTableRef = ref<InstanceType<typeof PageTable>>()
const curRoleGrade = computed(() => userInfo.value.role!.grade)

// 权限
const isUpdate = useVerifyPermission('table', 'update')
// 检索
const handleQueryClick = () => {
  pageTableRef.value?.fetchData()
}
const handleFormDataChange = ({ id, role_name, role_alias }: App.IDefaultObject) => {
  pageParams.value.queryCondition = { id, role_name, role_alias }
}

// 删除角色
const [handleDeleteClick, handleBatchDelete] = useDeleteRole(pageTableRef, curRoleGrade)

// modal
const { title, isShowDialog, modalFormData, handleEditClick, handleCreateClick, handleModalSubmit } =
  useHandleModalClick({
    curRoleGrade,
    pageTableRef
  })

// 状态切换
const handleSwitchChange = (row: Role.IRoleInfo) => async () => {
  if (!row.id) return false
  try {
    const res: App.IDefaultResult = await updateRoleStatus({ roleId: row.id, status: Number(!row.status) })
    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    if (res.code === 200) pageTableRef.value?.fetchData()
    return res.code === 200
  } catch (err) {
    global?.$message((<any>err).response.data.message, 'error')
    return false
  }
}
</script>

<style scoped></style>