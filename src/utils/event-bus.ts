import Vue from 'vue'

const vueInstance = new Vue()
const eventBus = {
  emit(event: string, ...args: any[]): void {
    vueInstance.$emit(event, args)
  },
  on(event: string | string[], callback: Function): void {
    vueInstance.$on(event, callback)
  },
  off(event?: string | string[], callback?: Function): void {
    vueInstance.$off(event, callback)
  },
  once(event: string | string[], callback: Function): void {
    vueInstance.$once(event, callback)
  },
}

export { eventBus }
