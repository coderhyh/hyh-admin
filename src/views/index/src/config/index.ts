import { IFormConfig } from '~/base-ui/hyh-form'

export const formConfig: IFormConfig = {
  rowGutter: 100,
  formDataList: [
    {
      type: 'input',
      label: '姓名',
      modelValue: 'name',
      inputConfig: {
        config: { placeholder: '请输入姓名' }
      }
    },
    {
      type: 'input',
      label: '年龄',
      modelValue: 'age',
      inputConfig: {
        config: { placeholder: '请输入年龄' }
      }
    },
    {
      type: 'input',
      label: '密码',
      modelValue: 'password',
      inputConfig: {
        config: {
          placeholder: '请输入密码',
          type: 'password'
        }
      }
    },
    {
      type: 'select',
      label: '爱好',
      modelValue: 'hobby',
      selectConfig: {
        config: {
          placeholder: 'select',
          option: [
            { label: '唱', value: '唱' },
            { label: '跳', value: '跳' },
            { label: 'rap', value: 'rap' },
            { label: '篮球', value: '篮球' }
          ]
        }
      }
    }
  ]
}
