import { IFormConfig } from '~/base-ui/hyh-form'

export const modalFormConfig = (
  treeList: any[],
  handleRadioChange: (val: any) => void
): {
  [k in 'defaultConfig' | 'directory' | 'menu' | 'permission']: IFormConfig
} => {
  const tree = [
    {
      page: '主类目',
      id: 0,
      children: treeList
    }
  ]
  const defaultConfig: IFormConfig = {
    labelPosition: 'right',
    formProps: {
      labelWidth: '80px',
      validateOnRuleChange: false
    },
    colAllProps: {
      xs: 30,
      sm: 30,
      md: 30,
      lg: 30,
      xl: 30
    },
    formDataList: [
      {
        type: 'treeSelect',
        label: '上级菜单',
        modelValue: 'parentId',
        defaultValue: 0,
        isShowTreeChildrenTotal: true,
        treeSelectProps: {
          config: {
            data: tree,
            checkStrictly: true,
            filterable: true,
            props: {
              label: 'page',
              value: 'id',
              children: 'children'
            }
          }
        },
        rules: [{ required: true, message: '上级菜单不能为空', trigger: 'blur' }]
      },
      {
        type: 'radioGroup',
        label: '菜单类型',
        modelValue: 'type',
        defaultValue: 'directory',
        radioGroupProps: {
          config: {
            option: [
              { label: '目录', value: 'directory' },
              { label: '菜单', value: 'menu' },
              { label: '权限', value: 'permission' }
            ]
          },
          event: {
            change: handleRadioChange
          }
        }
      },
      {
        type: 'input',
        label: '菜单名称',
        modelValue: 'page',
        inputProps: {
          config: {
            placeholder: '请输入菜单名称'
          }
        },
        colProps: {
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12
        },
        rules: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]
      },
      {
        type: 'input',
        label: '显示顺序',
        modelValue: 'order',
        defaultValue: '1',
        inputProps: {
          config: {
            placeholder: '请输入显示顺序'
          }
        },
        colProps: {
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12
        },
        rules: [{ required: true, message: '显示顺序不能为空', trigger: 'blur' }]
      }
    ]
  }

  const dir_menu: IFormConfig['formDataList'] = [
    {
      type: 'input',
      label: '路由地址',
      modelValue: 'route',
      inputProps: {
        config: {
          placeholder: '请输入路由地址'
        }
      },
      rules: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }],
      colProps: {
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }
    },
    {
      type: 'input',
      label: '路由名称',
      modelValue: 'routeName',
      inputProps: {
        config: {
          placeholder: '请输入路由名称'
        }
      },
      rules: [{ required: true, message: '路由名称不能为空', trigger: 'blur' }],
      colProps: {
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }
    },
    {
      label: '菜单图标',
      customSlotName: 'icon',
      modelValue: 'icon'
    },
    {
      type: 'radioGroup',
      label: '状态',
      modelValue: 'status',
      defaultValue: 0,
      colProps: {
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      },
      radioGroupProps: {
        config: {
          option: [
            { label: '正常', value: 0 },
            { label: '禁用', value: 1 }
          ]
        }
      }
    }
  ]

  const directory: IFormConfig = {
    ...defaultConfig,
    formDataList: [...defaultConfig.formDataList, ...dir_menu]
  }
  const menu: IFormConfig = {
    ...defaultConfig,
    formDataList: [
      ...defaultConfig.formDataList,
      ...dir_menu,
      {
        type: 'input',
        label: '组件路径',
        modelValue: 'component',
        inputProps: {
          config: {
            placeholder: '请输入组件路径'
          }
        },
        colProps: {
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12
        },
        rules: [{ required: true, message: '上级菜单不能为空', trigger: 'blur' }]
      },
      {
        type: 'treeSelect',
        label: '需要权限',
        modelValue: 'requiredId',
        defaultValue: null,
        isShowTreeChildrenTotal: true,
        treeSelectProps: {
          config: {
            data: tree,
            filterable: true,
            props: {
              label: 'page',
              value: 'id',
              children: 'children'
            }
          }
        }
      }
    ]
  }
  const permission: IFormConfig = {
    ...defaultConfig,
    formDataList: [
      ...defaultConfig.formDataList,
      {
        type: 'input',
        label: '权限标识',
        modelValue: 'permission',
        inputProps: {
          config: {
            placeholder: '权限标识 如: paper[table]:query'
          }
        },
        rules: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    ]
  }
  return {
    defaultConfig,
    directory,
    menu,
    permission
  }
}
