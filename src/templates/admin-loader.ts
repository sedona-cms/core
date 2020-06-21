import Vue from 'vue'
import { eventBus } from '../utils/event-bus'

export class AdminLoader {
  private eventBus?: typeof eventBus

  /**
   * Load Admin Panel
   *
   * @param fromContext if TRUE panel will be load with NuxtReady hook
   */
  public async load(fromContext: boolean = false): Promise<void> {
    await Promise.all([
      // @ts-ignore
      import('@sedona-cms/core/lib/assets/css/quasar.css'),
      // @ts-ignore
      import('@sedona-cms/core/lib/assets/css/admin.css'),
    ])

    document.body.style.setProperty('--q-color-primary', '#26a69a') // teal-5
    document.body.style.setProperty('--q-color-secondary', '#b0bec5')
    document.body.style.setProperty('--q-color-negative', '#f44336') // red
    document.body.style.setProperty('--q-color-dark', '#424242')

    document.body.style.setProperty('--admin-panel-width', '300px')

    const [, { eventBus }] = await Promise.all([
      import('./quasar'),
      // @ts-ignore
      import('@sedona-cms/core/lib/utils/event-bus'),
    ])

    this.eventBus = eventBus

    if (fromContext) {
      window.onNuxtReady(async () => {
        await this.loadSedona()
        await this.loadAdminPanel()
      })
    } else {
      await this.loadSedona()
      await this.loadAdminPanel()
    }
  }

  /**
   * Load Sedona
   */
  private async loadSedona(): Promise<void> {
    const { sedona } = await import('./sedona')
    Vue.prototype.$sedona = sedona

    this.eventBus?.emit('sedona:loaded')
  }

  /**
   * Load admin panel component and add to DOM
   */
  private async loadAdminPanel(): Promise<void> {
    const { AdminPanel } = await import('@sedona-cms/core/lib/components/admin-panel')
    const admin = new AdminPanel({ parent: window.$nuxt })
    window.$admin = admin
    document.body.prepend(admin.$mount().$el)

    this.eventBus?.emit('sedona:panel-loaded')
  }
}
