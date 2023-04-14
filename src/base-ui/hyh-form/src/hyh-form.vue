<template>
  <div class="hyh-form">
    <el-form :label-position="formConfig.labelPosition ?? 'top'" :model="formData">
      <el-row :gutter="formConfig.rowGutter ?? 20" class="flex flex-wrap">
        <template v-for="item in formConfig.formDataList" :key="item.label">
          <el-col v-bind="{ ...defaultCol, ...formConfig.colAllConfig, ...item.colConfig }">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.modelValue]"
                  v-bind="item.inputConfig?.config"
                  v-on="item.inputConfig?.event ?? {}"
                />
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.modelValue]"
                  v-bind="item.selectConfig?.config"
                  v-on="item.selectConfig?.event ?? {}"
                >
                  <el-option
                    v-for="it in item.selectConfig?.config?.option"
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
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
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
  xs: 25,
  sm: 15,
  md: 10,
  lg: 8,
  xl: 6,
  span: 24
}
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
