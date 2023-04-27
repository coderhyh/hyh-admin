<template>
  <div class="role-manage">
    <PageForm :form-config="formConfig" @query-click="handleQueryClick" @form-data-change="handleFormDataChange" />
    <!-- @on-delete-click="handleDeleteClick"

    @on-create-click="handleCreateClick"
    @on-batch-delete="handleBatchDelete" -->
    <PageTable
      ref="pageTableRef"
      page-type="role"
      mt-20px
      :fetch-fn="fetchRoleList"
      :table-config="tableConfig"
      edit-text="编辑权限"
      @on-edit-click="handleEditClick"
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
import { getPermissionListSelect } from '~/api/permission'
import { updateRoleInfo, updateRoleStatus } from '~/api/role'
import { IFormConfig } from '~/base-ui/hyh-form'
import PageTable from '~/components/page-table/page-table.vue'

import { formConfig, modalFormCreateConfig, modalFormEditConfig, tableConfig } from './config'

const { title, handleType, isShowDialog, modalFormData, handleClick } = usePageModal()

const { fetchRoleList, pageParams } = useStore('role')
const global = getCurrentInstance()?.proxy
const pageTableRef = ref<InstanceType<typeof PageTable>>()
// 权限
const isUpdate = useVerifyPermission('table', 'update')

// 检索
const handleQueryClick = () => {}
const handleFormDataChange = ({ id, role_name, role_alias }: App.IDefaultObject) => {
  pageParams.value.queryCondition = { id, role_name, role_alias }
}
// 请求权限选择项
const modalConfig: { [k in 'create' | 'edit']: IFormConfig } = {
  create: modalFormCreateConfig(<any>[]),
  edit: modalFormEditConfig(<any>[])
}
const treeList = ref<IPermission.IListSelect[]>([])
getPermissionListSelect<{ code: number; permissionListSelect: IPermission.IListSelect[] }>().then((res) => {
  treeList.value = res?.permissionListSelect ?? []
  // modalConfig.create = modalFormCreateConfig(options)
})

const handleEditClick = (row: Role.IRoleInfo) => {
  const permissionList = row.permission.map((e) => e.id)
  modalConfig.edit = modalFormEditConfig(treeList.value, permissionList)
  handleClick({
    type: 'edit',
    config: modalConfig.edit,
    title: '修改角色',
    formData: {
      id: row.id,
      role_name: row.role_name,
      role_alias: row.role_alias,
      status: row.status,
      permissionList
    }
  })
}
const handleModalSubmit = () => {
  useFetchTryCatch(async () => {
    let res: App.IDefaultObject = {}
    if (handleType.value === 'edit') {
      const { id, role_name, role_alias, status, permissionList } = modalFormData.value
      res = await updateRoleInfo({ roleId: id, role_name, role_alias, status: Number(status), permissionList })
    } else if (handleType.value === 'create') {
      console.log('create')
    }

    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    pageTableRef.value?.fetchData()
  }).catch((error: any) => {
    global?.$message(error?.response?.data?.message, 'error')
  })
}
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

<style scoped>
.role-manage {
}
</style>
