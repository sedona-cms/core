import Vue from 'vue'

type AdminLoader = {
  load: (fromContext: boolean) => Promise<void>
}

export const adminLoader: AdminLoader = {
  /**
   * Load admin UI
   *
   * @param {boolean} fromContext
   * @return {Promise<void>}
   */
  async load(fromContext: boolean = false): Promise<void> {
    // @ts-ignore
    await import('@sedona-cms/core/lib/assets/css/quasar.css')
    // @ts-ignore
    await import('@sedona-cms/core/lib/assets/css/admin.css')

    document.body.style.setProperty('--q-color-primary', '#26a69a') // teal-5
    document.body.style.setProperty('--q-color-secondary', '#b0bec5')
    document.body.style.setProperty('--q-color-negative', '#f44336') // red
    document.body.style.setProperty('--q-color-dark', '#424242')

    document.body.style.setProperty('--admin-panel-width', '300px')

    const Quasar = await require('./quasar')
    Vue.use(Quasar.default)

    const { Sedona } = await import('./sedona')
    Vue.prototype.$sedona = new Sedona()

    // @ts-ignore
    const { eventBus } = await import('@sedona-cms/core')
    eventBus.emit('sedona:loaded')

    if (fromContext) {
      window.onNuxtReady(async () => {
        await loadAdminPanel()
      })
    } else {
      await loadAdminPanel()
    }

    eventBus.emit('sedona:panel-loaded')
  },
}

async function loadAdminPanel(): Promise<void> {
  // @ts-ignore
  const { AdminPanel } = await import('@sedona-cms/core/lib/components/admin-panel')
  document.body.prepend(new AdminPanel({ parent: window.$nuxt }).$mount().$el)
}
