import type {
  ElForm,
  ElCol,
  ElInput,
  ElSelect,
  ElRow,
  FormRules,
  ElTree,
  ElSwitch,
  ElCascader,
  ElRadioGroup,
  ElTreeSelect,
  ElFormItem
} from 'element-plus'

export interface IFormConfig {
  labelPosition?: 'left' | 'right' | 'top'
  rowGutter?: number
  formDataList: IFormDataList[]
  formProps?: InstanceType<typeof ElForm>['$props']
  colAllProps?: InstanceType<typeof ElCol>['$props']
  rowProps?: InstanceType<typeof ElRow>['$props']
}

type defaultEventType = { [k: string]: (...args: any[]) => void }

export interface IFormDataList {
  type?: 'input' | 'select' | 'tree' | 'switch' | 'cascader' | 'radioGroup' | 'treeSelect'
  modelValue: string
  defaultValue?: any
  label?: string
  question?: string
  slotName?: string
  customSlotName?: string
  rules?: FormRules['key']
  colProps?: InstanceType<typeof ElCol>['$props']
  isDefaultCol?: boolean
  isShowCascaderTotal?: boolean
  isShowTreeChildrenTotal?: boolean
  formItemProps?: InstanceType<typeof ElFormItem>['$props']
  selectProps?: {
    config?: { option: { label: string; value: string | number; disabled?: boolean }[] } & InstanceType<
      typeof ElSelect
    >['$props']
    event?: defaultEventType
  }
  inputProps?: {
    config?: InstanceType<typeof ElInput>['$props']
    event?: defaultEventType
  }
  treeProps?: {
    config?: InstanceType<typeof ElTree>['$props']
    event?: defaultEventType
  }
  treeSelectProps?: {
    config?: InstanceType<typeof ElTreeSelect>['$props']
    event?: defaultEventType
  }
  switchProps?: {
    config?: InstanceType<typeof ElSwitch>['$props']
    event?: defaultEventType
  }
  cascaderProps?: {
    config?: InstanceType<typeof ElCascader>['$props']
    event?: defaultEventType
  }
  radioGroupProps?: {
    config?: { option: { label: string; value: string | number; disabled?: boolean }[] } & InstanceType<
      typeof ElRadioGroup
    >['$props']
    event?: defaultEventType
  }
}
