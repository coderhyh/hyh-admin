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
      label: '角色名',
      modelValue: 'role_name',
      inputProps: {
        config: { placeholder: '请输入角色名' }
      }
    },
    {
      type: 'input',
      label: '别名',
      modelValue: 'role_alias',
      inputProps: {
        config: { placeholder: '请输入别名' }
      }
    }
  ]
}
