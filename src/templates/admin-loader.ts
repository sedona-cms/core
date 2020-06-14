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

    await import('./quasar')

    const { sedona } = await import('./sedona')
    Vue.prototype.$sedona = sedona

    // @ts-ignore
    const { eventBus } = await import('@sedona-cms/core/lib/utils/event-bus')
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
  const admin = new AdminPanel({ parent: window.$nuxt })
  window.$admin = admin
  document.body.prepend(admin.$mount().$el)
}
