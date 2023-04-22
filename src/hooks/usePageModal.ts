import { IFormConfig } from '~/base-ui/hyh-form'

type handleClickParams = {
  type: 'edit' | 'create'
  config: IFormConfig
  title: string
  formData: App.IDefaultObject
}
export const usePageModal = () => {
  const handleType = ref<'edit' | 'create'>()
  const title = ref<string>('')
  const modalFormConfig = ref<App.IDefaultObject>({})
  const modalFormData = ref<App.IDefaultObject>({})
  const isShowDialog = ref<boolean>(false)
  provide('modalFormConfig', modalFormConfig)

  const handleClick = (c: handleClickParams) => {
    handleType.value = c.type
    modalFormConfig.value = c.config
    title.value = c.title
    modalFormData.value = c.formData
    isShowDialog.value = true
  }
  return { title, handleType, isShowDialog, modalFormData, handleClick }
}
