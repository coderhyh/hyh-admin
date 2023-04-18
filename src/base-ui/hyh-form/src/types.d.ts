import type { ElForm, ElCol, ElInput, ElSelect, ElRow } from 'element-plus'

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
  type: 'input' | 'select'
  modelValue: string
  label?: string
  colProps?: InstanceType<typeof ElCol>['$props']
  isDefaultCol?: boolean
  selectProps?: {
    config?: { option: { value: string; label: string }[] } & InstanceType<typeof ElSelect>['$props']
    event?: defaultEventType
  }
  inputProps?: {
    config?: InstanceType<typeof ElInput>['$props']
    event?: defaultEventType
  }
}
