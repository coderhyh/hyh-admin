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
  (e: 'formDataChange', formData: any): void
  (e: 'queryClick', formData: any): void
}>()

const formDataOrigin = useFormDataOrigin(props.formConfig.formDataList)
const formData = ref(formDataOrigin)

const handleResetClick = async () => {
  formData.value = formDataOrigin
  await nextTick()
  emit('queryClick', formData.value)
}
const handleQueryClick = () => {
  emit('queryClick', formData.value)
}
watch(
  formData,
  () => {
    emit('formDataChange', formData.value)
  },
  { deep: true }
)
</script>

<style lang="less" scoped>
.page-form {
  padding: 20px;
  border-radius: 10px;
  background-color: var(--hyh-bg-color);
  box-shadow: var(--el-box-shadow-lighter);
  transition: all 0.3s ease;

  :deep(.el-input__wrapper) {
    background-color: var(--hyh-el-input-bg);
    box-shadow: 0 0 0 1px var(--hyh-shadow-color);
    transition: all 0.3s ease;
  }
}
</style>
