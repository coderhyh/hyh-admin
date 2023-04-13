import { IFormConfig } from '~/components/hyh-form'

export const formConfig: IFormConfig = {
  labelPosition: 'top',
  rowGutter: 20,
  formDataList: [
    {
      type: 'input',
      label: '姓名',
      modelValue: 'name'
    },
    {
      type: 'input',
      label: '年龄',
      modelValue: 'age'
    }
  ]
}
