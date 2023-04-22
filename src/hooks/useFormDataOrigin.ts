import { IFormDataList } from '~/base-ui/hyh-form'

export const useFormDataOrigin = (formDataList: IFormDataList[]) =>
  formDataList.reduce<{ [k: string]: string }>((origin, item) => ((origin[item.modelValue] = ''), origin), {})
