<template>
  <div class="hyh-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ tableConfig.title ?? 'list' }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      ref="tableRef"
      v-loading="isLoading"
      :data="tableData"
      border
      v-bind="tableConfig.tableProps"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="tableConfig.showSelectColumn" type="selection" align="center" width="60"></el-table-column>
      <el-table-column
        v-if="tableConfig.showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>

      <template v-for="item in tableConfig.listDataConfig" :key="item.prop">
        <el-table-column
          v-bind="{ ...tableConfig.columnUnifyConfig, ...item.columnProps }"
          :label="item.columnLabel"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="item.slotName || item.customSlotName" :row="scope.row">
              {{ item.formatter ? item.formatter(scope.row[item.prop!]) : scope.row[item.prop!] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="tableConfig.showFooter" class="footer">
      <slot name="footer">
        <el-pagination
          v-model:current-page="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[20, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal ?? 0"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTable } from 'element-plus'

import { ITableConfig } from './type'

defineProps<{
  tableConfig: ITableConfig
  tableData: any[]
  isLoading?: boolean
  pageTotal?: number
}>()
const emit = defineEmits<{
  (e: 'selectionChange', value: any): void
  (e: 'onPageChange', value: { currentPage: number; pageSize: number }): void
}>()

const tableRef = ref<InstanceType<typeof ElTable>>()

const doLayout = () => tableRef.value?.doLayout()

const handleSelectionChange = (value: any) => {
  emit('selectionChange', value)
}

const page = ref({
  currentPage: 1,
  pageSize: 20
})
const handleCurrentChange = (e: any) => {
  emit('onPageChange', page.value)
}
const handleSizeChange = (e: any) => {
  emit('onPageChange', page.value)
}

defineExpose({ doLayout })
</script>

<style lang="less" scoped>
.hyh-table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    height: 45px;

    .title {
      font-weight: 700;
      font-size: 20px;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
