import type { ElCol, ElInput, ElSelect } from 'element-plus'

export interface IFormConfig {
  labelPosition?: 'left' | 'right' | 'top'
  rowGutter?: number
  formDataList: IFormDataList[]
  colAllConfig?: InstanceType<typeof ElCol>['$props']
}

type defaultEventType = { [k: string]: (...args: any[]) => void }

export interface IFormDataList {
  type: 'input' | 'select'
  label: string
  modelValue: string
  colConfig?: InstanceType<typeof ElCol>['$props']
  selectConfig?: {
    config?: { option: { value: string; label: string }[] } & InstanceType<typeof ElSelect>['$props']
    event?: defaultEventType
  }
  inputConfig?: {
    config?: InstanceType<typeof ElInput>['$props']
    event?: defaultEventType
  }
}
