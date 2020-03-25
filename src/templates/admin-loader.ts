import Vue from 'vue'

type AdminLoader = {
  load: () => Promise<void>
}

export const adminLoader: AdminLoader = {
  /**
   * Load admin UI
   *
   * @return {Promise<void>}
   */
  async load(): Promise<void> {
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
    const { AdminPanel } = await import('@sedona-cms/core/lib/components/admin-panel')
    document.body.prepend(new AdminPanel().$mount().$el)
  },
}
