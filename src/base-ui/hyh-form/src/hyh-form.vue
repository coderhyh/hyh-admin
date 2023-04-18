<template>
  <div class="hyh-form">
    <el-form
      v-bind="formConfig.formProps"
      ref="formRef"
      :label-position="formConfig.labelPosition ?? 'top'"
      :model="formData"
      :rules="formRules"
      @submit.prevent="onSubmit"
    >
      <el-row :gutter="formConfig.rowGutter ?? 20" v-bind="formConfig.rowProps" class="flex flex-wrap">
        <template v-for="item in formConfig.formDataList" :key="item.label">
          <el-col
            v-bind="{ ...(isDefaultCol(item.isDefaultCol) && defaultCol), ...formConfig.colAllProps, ...item.colProps }"
          >
            <el-form-item :label="item.label" :prop="item.modelValue">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.modelValue]"
                  v-bind="item.inputProps?.config"
                  v-on="item.inputProps?.event ?? {}"
                />
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.modelValue]"
                  v-bind="item.selectProps?.config"
                  v-on="item.selectProps?.event ?? {}"
                >
                  <el-option
                    v-for="it in item.selectProps?.config?.option ?? []"
                    :key="it.label"
                    :label="it.label"
                    :value="it.value"
                  />
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <button type="submit" hidden></button>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

import { IFormConfig } from './types'

type ModelValue = { [k: string]: any }
const props = defineProps<{
  formConfig: IFormConfig
  modelValue: ModelValue
  formRules?: FormRules
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', newFormData: Object): void
  (event: 'onSubmit'): void
}>()

const formData: ModelValue = useVModel(props, 'modelValue', emit)

const defaultCol = {
  xs: 25,
  sm: 15,
  md: 10,
  lg: 8,
  xl: 6,
  span: 24
}

const isDefaultCol = (flag: boolean | undefined) => (flag === undefined ? true : flag === true ? true : false)

const formRef = ref<FormInstance>()

const onSubmit = () => emit('onSubmit')

const getFormRef = () => formRef.value
defineExpose({ getFormRef })
</script>

<style lang="less" scoped>
.hyh-form {
  .footer {
    display: flex;
    justify-content: flex-end;
  }

  :deep(.el-form) {
    .el-form-item__content .el-select {
      width: 100%;
    }
  }
}
</style>
