import { IFormConfig } from '~/base-ui/hyh-form'

export const formConfig: IFormConfig = {
  rowGutter: 100,
  formDataList: [
    {
      type: 'input',
      label: 'ID',
      modelValue: 'id',
      inputProps: {
        config: { placeholder: '请输入ID' }
      }
    },
    {
      type: 'input',
      label: '用户名',
      modelValue: 'username',
      inputProps: {
        config: { placeholder: '请输入用户名' }
      }
    },
    {
      type: 'input',
      label: '昵称',
      modelValue: 'nickname',
      inputProps: {
        config: { placeholder: '请输入昵称' }
      }
    }
  ]
}
