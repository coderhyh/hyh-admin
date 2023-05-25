import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)

export default store

import layout from './src/layout'
import menu from './src/menu'
import role from './src/role'
import user from './src/user'
export { layout, menu, role, user }
