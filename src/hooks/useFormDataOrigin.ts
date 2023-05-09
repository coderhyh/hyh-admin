import { IFormDataList } from '~/base-ui/hyh-form'

export const useFormDataOrigin = (formDataList: IFormDataList[], defaultValue?: App.IDefaultObject) => {
  const defaultVal: App.IDefaultObject = {
    ...formDataList.reduce<App.IDefaultObject>(
      (data, e) => (e.defaultValue !== undefined && (data[e.modelValue] = e.defaultValue), data),
      {}
    ),
    ...defaultValue
  }
  return formDataList.reduce<{ [k: string]: string }>(
    (origin, item) => ((origin[item.modelValue] = defaultVal?.[item.modelValue] ?? ''), origin),
    {}
  )
}
