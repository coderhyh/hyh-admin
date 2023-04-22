import { IFormConfig } from '~/base-ui/hyh-form'

export const formConfig: IFormConfig = {
  rowGutter: 100,
  rowProps: {
    justify: 'center'
  },
  colAllProps: {
    span: 17
  },
  formDataList: [
    {
      type: 'input',
      modelValue: 'username',
      isDefaultCol: false,
      inputProps: {
        config: {
          placeholder: '请输入账号'
        }
      },
      rules: [{ required: true }]
    },
    {
      type: 'input',
      modelValue: 'password',
      isDefaultCol: false,
      inputProps: {
        config: {
          placeholder: '请输入密码',
          type: 'password',
          showPassword: true
        }
      },
      rules: [{ required: true }]
    }
  ]
}
