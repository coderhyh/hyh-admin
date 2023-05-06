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
import pinia from './store'

createApp(App).use(registerProperty).use(pinia).use(router).mount('#app')

console.log(import.meta.glob(`~/views/**/index.ts`))
