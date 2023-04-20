<template>
  <div class="role">
    <PageForm :form-config="formConfig" />
    <PageTable mt-20px :table-config="tableConfig" :fetch-fn="fetchUserList" />
  </div>
</template>

<script setup lang="ts">
import PageTable from '~/components/page-table/page-table.vue'

import { formConfig, tableConfig } from './config'

const { fetchUserList } = useStore('role')
</script>

<style scoped>
.role {
}
</style>
