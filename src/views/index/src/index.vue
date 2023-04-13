<template>
  <div class="index">
    <HyhForm v-model="formData" v-bind="{ formConfig }"> </HyhForm>
  </div>
</template>

<script setup lang="ts">
import { formConfig } from './config'

const formData = ref({
  name: '',
  age: ''
})
</script>

<style lang="less" scoped>
// .index {
// }
</style>
