import { IFormConfig } from '~/base-ui/hyh-form'

import { roleGradeOptions } from './role-grade-options'

export const modalFormCreateConfig = (treeList: any[], grade: number): IFormConfig => ({
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
      label: '角色名',
      modelValue: 'role_name',
      inputProps: {
        config: { placeholder: '请输入角色名' }
      },
      rules: [{ required: true, message: '角色名不能为空', trigger: 'blur' }]
    },
    {
      type: 'input',
      label: '别名',
      modelValue: 'role_alias',
      inputProps: {
        config: { placeholder: '请输入' }
      },
      rules: [
        { required: true, message: '别名不能为空', trigger: 'blur' },
        { max: 6, message: '别名最长6个字符', trigger: 'blur' }
      ]
    },
    {
      type: 'switch',
      label: '状态',
      modelValue: 'status',
      switchProps: {
        config: {
          activeText: '禁用',
          inactiveText: '启用',
          activeColor: '#e47470',
          inactiveColor: '#409EFF',
          activeValue: 1,
          inactiveValue: 0
        }
      }
    },
    {
      type: 'select',
      label: '级别',
      modelValue: 'grade',
      selectProps: {
        config: {
          option: roleGradeOptions.map((e) => ({ ...e, disabled: <number>e.value < grade }))
        }
      },
      rules: [{ required: true, message: '级别不能为空', trigger: 'blur' }]
    },
    {
      type: 'tree',
      label: '权限选择',
      modelValue: 'permissionList',
      defaultValue: () => [],
      treeProps: {
        config: {
          showCheckbox: true,
          data: treeList,
          nodeKey: 'id',
          accordion: true,
          props: {
            label: 'page',
            children: 'children'
          }
        }
      }
    }
  ]
})
