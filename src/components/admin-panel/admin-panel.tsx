import Vue, { VNode } from 'vue'
import { RouterView } from '../router-view'
import MainToolbar from './main-toolbar'

import './admin-panel.css'

let qApp: HTMLElement | null
let nuxtDiv: HTMLElement | null

export default Vue.extend({
  name: 'AdminPanel',
  components: {
    RouterView,
    MainToolbar,
  },
  data() {
    return {
      isPanelOpen: false as Boolean,
    }
  },
  async mounted(): Promise<void> {
    await this.$nextTick()

    qApp = document.querySelector('#q-app')
    nuxtDiv = document.querySelector('#__nuxt')

    if (qApp === null) {
      throw new Error(`No element with #q-app selector`)
    }
    if (nuxtDiv === null) {
      throw new Error(`No element with #__nuxt selector`)
    }

    const isOpen: boolean = JSON.parse(localStorage.getItem('sedona-panel-open') || 'false')
    if (isOpen) {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.open()
      }, 600)
    }
  },
  methods: {
    toggle(): void {
      this.isPanelOpen ? this.close() : this.open()
    },
    open(): void {
      // @ts-ignore
      qApp.style.left = '0px'
      // @ts-ignore
      nuxtDiv.style.paddingLeft = '300px'
      this.isPanelOpen = true
      localStorage.setItem('sedona-panel-open', String(true))
    },
    close(): void {
      // @ts-ignore
      qApp.style.left = '-300px'
      // @ts-ignore
      nuxtDiv.style.paddingLeft = 'unset'
      this.isPanelOpen = false
      localStorage.setItem('sedona-panel-open', String(false))
    },
  },
  render(): VNode {
    return (
      <div id="q-app" class="admin-panel q-dark" style="left: -300px">
        <div class="admin-panel--inner fit text-white q-gutter-y-sm shadow-5" style="z-index:1000">
          <q-btn
            color="dark"
            icon={this.isPanelOpen ? 'menu_open' : 'menu'}
            round={true}
            class="toggle-button"
            on-click={this.toggle}
          />
          <div class="fit">
            <main-toolbar />
            <router-view />
          </div>
        </div>
      </div>
    )
  },
})
