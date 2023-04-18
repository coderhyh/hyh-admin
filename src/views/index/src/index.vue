<template>
  <div class="index">
    <PageForm :form-config="formConfig" />
    <PageTable mt-20px :table-config="tableConfig" :table-data="tableData">
      <template #image="{ row }">
        <el-avatar shape="square" size="small" :src="row.img" />
      </template>
    </PageTable>
  </div>
</template>

<script setup lang="ts">
import { formConfig, tableConfig } from './config'

const tableData = [
  {
    name: 'hyh',
    age: 18,
    img: 'http://124.71.138.107/logo.png'
  },
  {
    name: 'hyh',
    age: 18,
    img: 'http://124.71.138.107/logo.png'
  },
  {
    name: 'hyh',
    age: 18,
    img: 'http://124.71.138.107/logo.png'
  },
  {
    name: 'hyh',
    age: 18,
    img: 'http://124.71.138.107/logo.png'
  }
]
</script>

<style lang="less" scoped></style>
