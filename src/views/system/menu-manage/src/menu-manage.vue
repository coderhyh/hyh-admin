<template>
  <div class="menu-manage">
    <PageTable
      ref="pageTableRef"
      page-type="role"
      :automatic-request-fn="fetchMenuListTree"
      :table-config="tableConfig"
      edit-text="编辑"
      @on-edit-click="handleEditClick"
      @on-create-click="handleCreateClick"
    >
      <template #icon="{ row }">
        <Icon v-if="row.icon" :icon="row.icon" size="20" />
      </template>
      <template #status="{ row }">
        <el-tag :type="row.status ? 'danger' : 'success'">{{ getStatusText(row.status) }}</el-tag>
      </template>
    </PageTable>
    <!--
      @on-delete-click="handleDeleteClick"
      @on-batch-delete="handleBatchDelete"
      -->
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
          <el-option v-for="item in icons" :key="item" :value="item">
            <Icon :icon="item" size="20" />
          </el-option>
        </el-select>
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import { icons } from '~/assets/icons'
import PageTable from '~/components/page-table/page-table.vue'

import { tableConfig } from './config'
import { useHandleModalClick } from './hooks'

const { fetchMenuListTree } = useStore('menu')
const { winSize } = useStore('layout')
const global = getCurrentInstance()?.proxy
const pageTableRef = ref<InstanceType<typeof PageTable>>()

const getStatusText = (status: App.AccountStatus) => (status === 0 ? '正常' : '冻结')

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
