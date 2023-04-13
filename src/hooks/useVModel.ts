export const useVModel = <T extends Readonly<{ [k: string]: any }>>(props: T, key: keyof T, emit: Function) => {
  return computed({
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
