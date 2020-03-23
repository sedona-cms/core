import { Sedona } from '../src/templates/sedona'

declare module 'vue/types/vue' {
  interface Vue {
    $sedona: Sedona
  }
}
