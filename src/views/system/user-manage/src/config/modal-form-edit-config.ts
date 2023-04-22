import { IFormConfig } from '~/base-ui/hyh-form'

export const modalFormEditConfig = (roleOptions: App.ISelectOption[]): IFormConfig => ({
  labelPosition: 'left',
  formProps: {
    labelWidth: '70px',
    hideRequiredAsterisk: true
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
      label: 'ID',
      modelValue: 'id',
      inputProps: {
        config: { disabled: true }
      }
    },
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
          option: roleOptions
        }
      },
      rules: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
    }
  ]
})
