export const useVModel = <R = any>(
  props: { [k: string]: any },
  key: keyof typeof props,
  emit: (e: any, value: any) => void
) => {
  return computed<R>({
    get() {
      return new Proxy(props[key], {
        set(obj, name, val) {
          emit(`update:${String(key)}`, { ...obj, [name]: val })
          return true
        }
      })
    },
    set(val) {
      emit(`update:${String(key)}`, val)
    }
  })
}
