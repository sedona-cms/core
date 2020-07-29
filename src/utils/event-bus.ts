import Vue from 'vue'

type EventCallback = (...args: never[]) => void

const vueInstance = new Vue()
const eventBus = {
  emit(event: string, ...args: unknown[]): void {
    vueInstance.$emit(event, args)
  },
  on(event: string | string[], callback: EventCallback): void {
    vueInstance.$on(event, callback)
  },
  off(event?: string | string[], callback?: EventCallback): void {
    vueInstance.$off(event, callback)
  },
  once(event: string | string[], callback: EventCallback): void {
    vueInstance.$once(event, callback)
  },
}

export { eventBus }
