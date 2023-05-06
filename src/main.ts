import './assets/css/index.less'
import 'element-plus/dist/index.css'
import 'nprogress/nprogress.css'
// eslint-disable-next-line import/no-unresolved
import 'uno.css'
import 'animate.css'

import { createApp } from 'vue'

import App from './App.vue'
import registerProperty from './global/registerProperty'
import router from './router'
import pinia, { menu, user } from './store'

const app = createApp(App)
app.use(registerProperty)
app.use(pinia)
user().token && (await menu().fetchMenus())
app.use(router)
app.mount('#app')
