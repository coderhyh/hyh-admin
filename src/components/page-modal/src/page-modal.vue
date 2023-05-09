<template>
  <div class="dialog">
    <el-dialog
      v-model="_isShowDialog"
      destroy-on-close
      :title="title"
      :width="width"
      center
      draggable
      :lock-scroll="false"
    >
      <HyhForm ref="hyhFormRef" v-bind="{ formConfig: modalFormConfig! }" v-model="_formData" @on-submit="handleSubmit">
        <template #footer>
          <span>
            <el-button @click="_isShowDialog = false"> 关闭 </el-button>
            <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
          </span>
        </template>

        <template v-for="item in customSlotNames" :key="item.customSlotName" #[item.customSlotName!]="{ row }">
          <template v-if="item.customSlotName">
            <slot :name="item.customSlotName" :row="row"></slot>
          </template>
        </template>
      </HyhForm>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'

import HyhForm, { IFormConfig } from '~/base-ui/hyh-form'

const modalFormConfig = inject<Ref<IFormConfig>>('modalFormConfig')

const props = withDefaults(
  defineProps<{
    show?: boolean
    formData: App.IDefaultObject
    title?: string
    width?: string
  }>(),
  {
    show: false,
    title: '',
    width: '450px'
  }
)
const emit = defineEmits<{
  (e: 'update:show', flag: boolean): void
  (e: 'update:formData', flag: boolean): void
  (e: 'onSubmit'): void
}>()

const hyhFormRef = ref<InstanceType<typeof HyhForm>>()

const _isShowDialog = useVModel<boolean>(props, 'show', emit)

const _formData = useVModel<App.IDefaultObject>(props, 'formData', emit)

const customSlotNames = computed(() => modalFormConfig?.value.formDataList.filter((e) => e.customSlotName))

const handleSubmit = async () => {
  const formRef = hyhFormRef.value?.getFormRef()
  const validateRes = await formRef?.validate(() => {})
  if (validateRes) {
    emit('onSubmit')
  }
}
</script>

<style scoped lang="less">
.dialog {
  :deep(.footer) {
    justify-content: center !important;
  }

  // :deep(.el-dialog__body) {
  //   overflow-y: scroll;
  //   height: 500px !important;
  // }
}
</style>
