import { App } from 'vue'

import { elementUtils } from './elementUtils'

export default {
  install(app: App) {
    for (const [key, val] of Object.entries(elementUtils)) {
      app.config.globalProperties[key] = val
    }
  }
}
