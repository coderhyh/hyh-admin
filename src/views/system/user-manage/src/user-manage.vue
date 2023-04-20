<template>
  <div class="user-manage">
    <PageForm :form-config="formConfig" />
    <PageTable mt-20px :table-config="tableConfig" :fetch-fn="fetchUserList" />
  </div>
</template>

<script setup lang="ts">
import PageTable from '~/components/page-table/page-table.vue'

import { formConfig, tableConfig } from './config'

const { fetchUserList } = useStore('user')
</script>

<style scoped>
.user-manage {
}
</style>
