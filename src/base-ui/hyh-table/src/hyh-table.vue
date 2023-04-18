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
    <el-table :data="tableData" border v-bind="tableConfig.tableProps" @selection-change="handleSelectionChange">
      <el-table-column v-if="tableConfig.showSelectColumn" type="selection" align="center" width="60"></el-table-column>
      <el-table-column
        v-if="tableConfig.showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>

      <template v-for="item in tableConfig.listDataConfig" :key="item.prop">
        <el-table-column v-bind="item.columnProps" :label="item.columnLabel" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName || item.customSlotName" :row="scope.row">
              {{ scope.row[item.prop!] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ITableConfig } from './type'

defineProps<{
  tableConfig: ITableConfig
  tableData: {}[]
}>()
const emit = defineEmits<{
  (e: 'selectionChange', value: any): void
}>()

const handleSelectionChange = (value: any) => {
  emit('selectionChange', value)
}
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
}
</style>
