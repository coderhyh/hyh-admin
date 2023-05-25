import type { ToRef } from 'vue'

import layoutStore from '~/store/src/layout'
import menuStore from '~/store/src/menu'
import roleStore from '~/store/src/role'
import userStore from '~/store/src/user'

type AutoToRefs<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
}

const storeExports = {
  layout: layoutStore,
  menu: menuStore,
  role: roleStore,
  user: userStore
}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as unknown as AutoToRefs<ReturnType<typeof storeExports[T]>>
}
