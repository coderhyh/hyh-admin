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
import PageTable from '~/components/page-table/page-table.vue'

import { formConfig, tableConfig } from './config'
import { useDeleteUser, useHandleModalClick } from './hooks'

const { fetchUserList, pageParams, userInfo } = useStore('user')
const pageTableRef = ref<InstanceType<typeof PageTable>>()
const curRoleGrade = computed(() => userInfo.value.role!.grade)

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
</script>

<style scoped></style>
