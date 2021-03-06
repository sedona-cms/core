import { sedona } from '../src/templates/sedona'

declare module 'vue/types/vue' {
  interface Vue {
    $sedona: sedona
    $adminLoader: {
      load: () => Promise<void>
    }
  }
}

declare module '@nuxt/types' {
  interface Context {
    $adminLoader: {
      load: () => Promise<void>
    }
  }
}

declare global {
  interface Window {
    onNuxtReady: (...args) => void
    $admin: any
  }
}
