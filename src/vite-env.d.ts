/// <reference types="vite/client" />
import 'vue'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    // $Bus: string
  }
}

interface ImportMetaEnv {
  readonly VITE_SOCKET_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
