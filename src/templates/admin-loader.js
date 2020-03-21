import Vue from 'vue'
import {Context} from '@nuxt/vue-app'

/**
 * Load admin
 *
 * @exports
 * @param {Context} context nuxt context
 */
export async function load(context) {
    // @ts-ignore
    await import('@sedona-cms/core/lib/assets/css/quasar.css')
    // @ts-ignore
    await import('@sedona-cms/core/lib/assets/css/admin.css')

    const Quasar = await require('./quasar')
    Vue.use(Quasar.default)

    document.body.style.setProperty('--q-color-primary', '#26a69a') // teal-5
    document.body.style.setProperty('--q-color-secondary', '#b0bec5')
    document.body.style.setProperty('--q-color-negative', '#f44336') // red
    document.body.style.setProperty('--q-color-dark', '#424242')

    // await loadAdminPanel(context.app)

    window._onNuxtLoaded = async ($root) => {
        console.log($root)
        await loadAdminPanel($root)
    }
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
async function loadAdminPanel($root) {
    // @ts-ignore
    const AdminPanel = (await import('@sedona-cms/core/lib/components/router-view/router-panel')).default
    const adminPanel = new AdminPanel()
    const $nuxt = document.querySelector('body')
    if ($nuxt !== null) {
        $nuxt.prepend(adminPanel.$mount().$el)
    }
}
