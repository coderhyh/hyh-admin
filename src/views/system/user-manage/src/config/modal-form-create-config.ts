import { IFormConfig } from '~/base-ui/hyh-form'

export const modalFormCreateConfig = (roleOptions: App.ISelectOption[], grade: number): IFormConfig => ({
  labelPosition: 'right',
  formProps: {
    labelWidth: '80px'
  },
  colAllProps: {
    xs: 50,
    sm: 50,
    md: 50,
    lg: 50,
    xl: 50
  },
  formDataList: [
    {
      type: 'input',
      label: '用户名',
      modelValue: 'username',
      inputProps: {
        config: { placeholder: '请输入用户名' }
      },
      rules: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        {
          pattern: /^[a-zA-Z\d.]{6,16}$/,
          message: '用户名需要为6-16位的字母/数字/.',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      label: '密码',
      modelValue: 'password',
      inputProps: {
        config: { type: 'password', placeholder: '请输入密码', showPassword: true }
      },
      rules: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        {
          pattern: /^[\da-zA-z_.]{6,16}$/,
          message: '密码需要为6-16位的字母/数字/_/.',
          trigger: 'blur'
        }
      ]
    },
    {
      type: 'input',
      label: '昵称',
      modelValue: 'nickname',
      inputProps: {
        config: { placeholder: '请输入昵称' }
      },
      rules: [
        { required: true, message: '昵称不能为空', trigger: 'blur' },
        { max: 6, message: '昵称最长6个字符', trigger: 'blur' }
      ]
    },
    {
      type: 'select',
      label: '角色',
      modelValue: 'role',
      selectProps: {
        config: {
          option: roleOptions.map((e) => ({
            ...e,
            disabled: e.disabled ? e.disabled : e.grade < grade
          }))
        }
      },
      rules: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
    }
  ]
})
