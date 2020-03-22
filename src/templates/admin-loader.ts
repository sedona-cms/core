import Vue from 'vue'
import { Context } from '@nuxt/types'

/**
 * Load admin
 *
 * @exports
 * @param {Context} context nuxt context
 * @param {ModuleConfig} config module config
 */
export async function load(context: Context, config: ModuleConfig): Promise<void> {
    // @ts-ignore
    await import('@sedona-cms/core/lib/assets/css/quasar.css')
    // @ts-ignore
    await import('@sedona-cms/core/lib/assets/css/admin.css')

    const Quasar = await require('./quasar')
    Vue.use(Quasar.default)

    const Sedona = (await import('./sedona')).default
    Vue.prototype.$sedona = new Sedona({
        propsData: {
            config,
        },
    })

    document.body.style.setProperty('--q-color-primary', '#26a69a') // teal-5
    document.body.style.setProperty('--q-color-secondary', '#b0bec5')
    document.body.style.setProperty('--q-color-negative', '#f44336') // red
    document.body.style.setProperty('--q-color-dark', '#424242')

    await loadAdminPanel(context.app)

    // @ts-ignore
    // window._onNuxtLoaded = async ($root) => {
    //    await loadAdminPanel($root)
    // }
}

/**
 * Unload admin
 *
 * @exports
 * @param {Context} context nuxt context
 */
export function unload(context) {

}

/**
 * Load and mount Admin Panel component
 *
 * @param {Vue} $root root component
 *
 * @returns {Promise<void>} void
 */
async function loadAdminPanel($root): Promise<void> {
    // @ts-ignore
    const AdminPanel = (await import('@sedona-cms/core/lib/components/router-view/router-panel')).default
    const adminPanel = new AdminPanel()
    document.body.prepend(adminPanel.$mount().$el)
}
