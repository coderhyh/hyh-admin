import 'vue'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    $message: (message: string, type?: 'success' | 'warning' | 'info' | 'error') => MessageHandler
  }
}
