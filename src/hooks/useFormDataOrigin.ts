import { IFormDataList } from '~/base-ui/hyh-form'

export const useFormDataOrigin = (formDataList: IFormDataList[], defaultValue?: App.IDefaultObject) => {
  const defaultVal: App.IDefaultObject = {
    ...formDataList.reduce<App.IDefaultObject>(
      (data, e) => (
        e.defaultValue !== undefined &&
          (data[e.modelValue] = typeof e.defaultValue === 'function' ? e.defaultValue() : e.defaultValue),
        data
      ),
      {}
    ),
    ...(defaultValue &&
      Object.entries(defaultValue).reduce<App.IDefaultObject>(
        (o, [k, v]) => (o[k] = typeof v === 'function' ? v() : v),
        {}
      ))
  }
  return formDataList.reduce<{ [k: string]: string }>(
    (origin, item) => ((origin[item.modelValue] = defaultVal?.[item.modelValue] ?? ''), origin),
    {}
  )
}
