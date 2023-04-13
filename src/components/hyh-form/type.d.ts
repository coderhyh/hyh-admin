export interface IFormConfig {
  labelPosition: string
  rowGutter: number
  formDataList: IFormDataList[]
}

export interface IFormDataList {
  type: string
  label: string
  modelValue: string
  elColConfig?: {
    xs?: number
    sm?: number
    md?: number
    xl?: number
    span?: number
  }
}
