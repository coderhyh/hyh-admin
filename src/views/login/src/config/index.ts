import { FormRules } from 'element-plus'

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
      }
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
      }
    }
  ]
}

export const formRules: FormRules = {
  userName: [{ required: true }],
  password: [{ required: true }]
}
