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
      <el-row :gutter="formConfig.rowGutter ?? 20" v-bind="formConfig.rowProps">
        <template v-for="item in formConfig.formDataList" :key="item.label">
          <el-col
            v-bind="{ ...(isDefaultCol(item.isDefaultCol) && defaultCol), ...formConfig.colAllProps, ...item.colProps }"
          >
            <el-form-item :label="item.label" :prop="item.modelValue">
              <slot :name="item.slotName || item.customSlotName" :row="item">
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
                      :disabled="it.disabled"
                    />
                  </el-select>
                </template>

                <template v-else-if="item.type === 'tree'">
                  <el-tree
                    style="width: 100%"
                    v-bind="item.treeProps?.config"
                    @check="(_, data: any) => handleCheckChange(data.checkedKeys, item)"
                  />
                </template>

                <template v-else-if="item.type === 'treeSelect'">
                  <el-tree-select v-model="formData[item.modelValue]" v-bind="item.treeSelectProps?.config">
                    <template #default="{ data }">
                      <span>{{ data.page }}</span>
                      <span v-if="data.children?.length && item.isShowTreeChildrenTotal">
                        ({{ data.children.length }})
                      </span>
                    </template>
                  </el-tree-select>
                </template>

                <template v-else-if="item.type === 'switch'">
                  <el-switch v-model="formData[item.modelValue]" inline-prompt v-bind="item.switchProps?.config" />
                </template>

                <template v-else-if="item.type === 'cascader'">
                  <el-cascader
                    v-model="formData[item.modelValue]"
                    :options="item.cascaderProps?.config?.options"
                    v-bind="item.cascaderProps?.config"
                    v-on="item.cascaderProps?.event ?? {}"
                  >
                    <template #default="{ node, data }">
                      <span>{{ data[item.cascaderProps?.config?.props?.label ?? 'label'] }}</span>
                      <span v-if="!node.isLeaf && item.isShowCascaderTotal"> ({{ data.children.length }}) </span>
                    </template>
                  </el-cascader>
                </template>

                <template v-else-if="item.type === 'radioGroup'">
                  <el-radio-group v-model="formData[item.modelValue]" v-on="item.radioGroupProps?.event ?? {}">
                    <el-radio
                      v-for="it in item.radioGroupProps?.config?.option ?? []"
                      :key="it.value"
                      :label="it.value"
                      :disabled="it.disabled"
                      >{{ it.label }}</el-radio
                    >
                  </el-radio-group>
                </template>
              </slot>
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
import type { FormInstance } from 'element-plus'

import { IFormConfig, IFormDataList } from './types'

const props = defineProps<{
  formConfig: IFormConfig
  modelValue: App.IDefaultObject
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', newFormData: Object): void
  (event: 'onSubmit'): void
}>()

const formData = useVModel<App.IDefaultObject>(props, 'modelValue', emit)

const defaultCol = {
  xs: 25,
  sm: 15,
  md: 10,
  lg: 8,
  xl: 6,
  span: 24
}

const isDefaultCol = (flag: boolean | undefined) => (flag === undefined ? true : flag === true ? true : false)
const formRules = computed(() =>
  props.formConfig.formDataList.reduce<App.IDefaultObject>((o, e) => ((o[e.modelValue] = e.rules), o), {})
)

const formRef = ref<FormInstance>()

const onSubmit = () => emit('onSubmit')

const getFormRef = () => formRef.value
defineExpose({ getFormRef })

const handleCheckChange = (keys: (number | undefined)[], item: IFormDataList) => {
  formData.value[item.modelValue] = keys.filter(Boolean)
}
</script>

<style lang="less" scoped>
.hyh-form {
  .footer {
    display: flex;
    justify-content: flex-end;
  }

  :deep(.el-form) {
    .el-form-item__content .el-select,
    .el-cascader {
      width: 100%;
    }
  }
}
</style>
