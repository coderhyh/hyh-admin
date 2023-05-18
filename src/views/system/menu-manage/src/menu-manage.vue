<template>
  <div class="menu-manage">
    <PageTable
      ref="pageTableRef"
      :automatic-request-fn="fetchMenuListTree"
      :table-config="tableConfig"
      edit-text="编辑"
      @on-edit-click="handleEditClick"
      @on-create-click="handleCreateClick"
      @on-delete-click="handleDeleteClick"
      @on-batch-delete="handleBatchDelete"
    >
      <template #icon="{ row }">
        <Icon v-if="row.icon" ref="iconRef" :icon="row.icon" size="20" />
      </template>
      <template #status="{ row }">
        <el-tag :type="row.status ? 'danger' : 'success'">{{ getStatusText(row.status) }}</el-tag>
      </template>
    </PageTable>
    <PageModal
      v-model:show="isShowDialog"
      v-model:form-data="modalFormData"
      :title="title"
      :width="winSize < 768 ? '450px' : '600px'"
      @on-submit="handleModalSubmit"
    >
      <template #icon="{ row }">
        <el-select v-model="modalFormData[row.modelValue]" placeholder="请选择图标" :teleported="false">
          <template v-if="modalFormData[row.modelValue]" #prefix>
            <Icon :icon="modalFormData[row.modelValue]" size="20" />
          </template>
          <el-option v-for="item in iconRef?.icons" :key="item" :value="item">
            <Icon :icon="item" size="20" />
          </el-option>
        </el-select>
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import Icon from '~/base-ui/Icon/Icon.vue'
import PageTable from '~/components/page-table/page-table.vue'

import { tableConfig } from './config'
import { useDeleteMenu, useHandleModalClick } from './hooks'

const { fetchMenuListTree } = useStore('menu')
const { winSize } = useStore('layout')
const pageTableRef = ref<InstanceType<typeof PageTable>>()
const iconRef = ref<InstanceType<typeof Icon>>()

const getStatusText = (status: App.AccountStatus) => (status === 0 ? '正常' : '禁用')

// 删除角色
const [handleDeleteClick, handleBatchDelete] = useDeleteMenu(pageTableRef)

// modal
const { title, isShowDialog, modalFormData, handleEditClick, handleCreateClick, handleModalSubmit } =
  useHandleModalClick({
    pageTableRef
  })
</script>

<style scoped lang="less">
.menu-manage {
  :deep(.el-select) {
    .el-popper {
      width: 100%;

      ul {
        display: flex;
        flex-wrap: wrap;
        flex-shrink: 1;

        li {
          margin: 0 calc((100% - 30px * 10) / 10 / 2);
          padding: 0;
          width: 30px;
          text-align: center;

          i {
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
