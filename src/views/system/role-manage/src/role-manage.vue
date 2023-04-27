<template>
  <div class="role-manage">
    <PageForm :form-config="formConfig" @query-click="handleQueryClick" @form-data-change="handleFormDataChange" />
    <!--
    @on-create-click="handleCreateClick"
     -->
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
import { deleteRole, updateRoleInfo, updateRoleStatus } from '~/api/role'
import { IFormConfig } from '~/base-ui/hyh-form'
import PageTable from '~/components/page-table/page-table.vue'
import { elementUtils } from '~/global/elementUtils'

import { formConfig, modalFormCreateConfig, modalFormEditConfig, tableConfig } from './config'

const { title, handleType, isShowDialog, modalFormData, handleClick } = usePageModal()

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
// 请求权限选择项
const modalConfig: { [k in 'create' | 'edit']: IFormConfig } = {
  create: modalFormCreateConfig(<any>[]),
  edit: modalFormEditConfig(<any>[], [], curRoleGrade.value)
}
const treeList = ref<IPermission.IListSelect[]>([])
getPermissionListSelect<{ code: number; permissionListSelect: IPermission.IListSelect[] }>().then((res) => {
  treeList.value = res?.permissionListSelect ?? []
  // modalConfig.create = modalFormCreateConfig(options)
})

// 删除角色
const deleteRoles = (roles: number[]) =>
  useFetchTryCatch(async () => {
    const res: App.IDefaultResult = await deleteRole(roles)
    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    pageTableRef.value?.fetchData()
  }).catch((err: any) => {
    global?.$message(err.response.data.message, 'error')
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

// modal
const handleEditClick = (row: Role.IRoleInfo) => {
  const permissionList = row.permission.map((e) => e.id)
  modalConfig.edit = modalFormEditConfig(treeList.value, permissionList, curRoleGrade.value)
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
      console.log('create')
    }
    if (res.code === 200) isShowDialog.value = false
    global?.$message(res.message, res.code === 200 ? 'success' : 'error')
    pageTableRef.value?.fetchData()
  }).catch((error: any) => {
    global?.$message(error?.response?.data?.message, 'error')
  })
}
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

<style scoped>
.role-manage {
}
</style>
