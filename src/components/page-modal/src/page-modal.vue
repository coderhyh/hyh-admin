<template>
  <el-dialog
    v-model="_isShowDialog"
    destroy-on-close
    :title="title"
    width="450px"
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
    </HyhForm>
  </el-dialog>
</template>

<script setup lang="ts">
import HyhForm, { IFormConfig } from '~/base-ui/hyh-form'

const modalFormConfig = inject<IFormConfig>('modalFormConfig')

const props = withDefaults(
  defineProps<{
    show?: boolean
    formData: App.IDefaultObject
    title?: string
  }>(),
  {
    show: false,
    title: ''
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

const handleSubmit = async () => {
  const formRef = hyhFormRef.value?.getFormRef()
  const validateRes = await formRef?.validate(() => {})
  if (validateRes) {
    emit('onSubmit')
  }
}
</script>

<style scoped>
:deep(.footer) {
  justify-content: center !important;
}
</style>
