<template>
  <div class="index">
    <PageForm :form-config="formConfig" />
  </div>
</template>

<script setup lang="ts">
import PageForm from '~/components/page-form/page-form.vue'

import { formConfig } from './config'
</script>

<style lang="less" scoped></style>
