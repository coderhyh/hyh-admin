<template>
  <div class="hyh-form">
    <el-form label-position="top" :model="formData">
      <el-row :gutter="20" class="flex flex-wrap">
        <template v-for="item in formConfig.formDataList" :key="item.label">
          <el-col v-bind="{ ...defaultCol, ...item.elColConfig }">
            <el-form-item :label="item.label">
              <el-input v-model="formData[item.modelValue]" />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { IFormConfig } from './type'

type ModelValue = { [k: string]: any }
const props = defineProps<{
  formConfig: IFormConfig
  modelValue: ModelValue
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', newFormData: Object): void
}>()

const formData: ModelValue = useVModel(props, 'modelValue', emit)

const defaultCol = {
  xs: 15,
  sm: 10,
  md: 7,
  lg: 7,
  xl: 7,
  span: 24
}
</script>

<style lang="less" scoped>
// .hyh-form {
// }
</style>
