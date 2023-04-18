<template>
  <div class="page-table">
    <HyhTable :table-config="tableConfig" :table-data="tableData">
      <template #headerHandler>
        <el-button type="primary" size="small"> 新建 </el-button>
      </template>

      <template #handler>
        <div>
          <el-button size="small"> 编辑 </el-button>
          <el-button size="small">删除</el-button>
        </div>
      </template>

      <template v-for="item in customSlotNameList" :key="item.prop" #[item.customSlotName!]="scope">
        <template v-if="item.customSlotName">
          <slot :name="item.customSlotName" :row="scope.row"></slot>
        </template>
      </template>
    </HyhTable>
  </div>
</template>

<script setup lang="ts">
import { ITableConfig } from '~/base-ui/hyh-table'

const props = defineProps<{
  tableConfig: ITableConfig
  tableData: {}[]
}>()

const customSlotNameList = computed(() => props.tableConfig.listDataConfig.filter((e) => e.customSlotName))
</script>

<style lang="less" scoped>
.page-table {
  padding: 20px;
  border-radius: 15px;
  background-color: white;
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
