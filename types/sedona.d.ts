import { Sedona } from './generated/templates/sedona'

declare module 'vue/types/vue' {
  interface Vue {
    $sedona: Sedona
    $adminLoader: {
      load: () => Promise<void>
      unload: () => Promise<void>
    }
  }
}
