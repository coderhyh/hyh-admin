import type { ElForm, ElCol, ElInput, ElSelect, ElRow, FormRules, ElTree, ElSwitch } from 'element-plus'

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
  type: 'input' | 'select' | 'tree' | 'switch'
  modelValue: string
  label?: string
  slotName?: string
  customSlotName?: string
  rules?: FormRules['key']
  colProps?: InstanceType<typeof ElCol>['$props']
  isDefaultCol?: boolean
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
  switchProps?: {
    config?: InstanceType<typeof ElSwitch>['$props']
    event?: defaultEventType
  }
}
