<template>
  <div class="page-form">
    <HyhForm v-model="formData" v-bind="{ formConfig }" @on-submit="handleQueryClick">
      <template #footer>
        <el-button type="danger" @click="handleResetClick">重置</el-button>
        <el-button type="primary" @click="handleQueryClick">提交</el-button>
      </template>
    </HyhForm>
  </div>
</template>

<script setup lang="ts">
import { IFormConfig } from '~/base-ui/hyh-form'

const props = defineProps<{
  formConfig: IFormConfig
}>()
const emit = defineEmits<{
  (e: 'queryClick', formData: { [k: string]: string }): void
}>()

const global = getCurrentInstance()?.proxy

const formDataOrigin = useFormDataOrigin(props.formConfig.formDataList)
const formData = ref(formDataOrigin)

const handleResetClick = () => {
  formData.value = formDataOrigin
}
const handleQueryClick = () => {
  // const flag = Object.entries(formData.value).some(([k, v]) => v.trim())
  emit('queryClick', formData.value)
  // if (flag) {
  // } else {
  //   global?.$message('检索内容不能有空', 'warning')
  // }
}
</script>

<style lang="less" scoped>
.page-form {
  padding: 20px;
  border-radius: 10px;
  background: white;
  box-shadow: var(--el-box-shadow-lighter);
}
</style>
