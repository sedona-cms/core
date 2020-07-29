import Vue, { VNode, CreateElement } from 'vue'
import { RouterView } from '../router-view'
import MainToolbar from './main-toolbar'
import { SavePanel } from '../save-panel'
import { eventBus } from '../../utils/event-bus'
import { state } from '../../store/router'

import './admin-panel.css'

let qApp: HTMLElement | null
let nuxtDiv: HTMLElement | null

export default Vue.extend({
  name: 'AdminPanel',
  components: {
    RouterView,
    MainToolbar,
    SavePanel,
  },
  data() {
    return {
      isPanelOpen: false as boolean,
      savePanel: false as SavePanel | boolean,
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

    eventBus.on('core:navigate', this.initSavePanel)
  },
  beforeDestroy(): void {
    eventBus.off('core:navigate', this.initSavePanel)
  },
  methods: {
    toggle(): void {
      this.isPanelOpen ? this.close() : this.open()
    },
    open(): void {
      if (qApp !== null) qApp.style.left = '0px'
      if (nuxtDiv !== null) nuxtDiv.style.paddingLeft = '300px'
      this.isPanelOpen = true
      localStorage.setItem('sedona-panel-open', String(true))
    },
    close(): void {
      if (qApp !== null) qApp.style.left = '-300px'
      if (nuxtDiv !== null) nuxtDiv.style.paddingLeft = 'unset'
      this.isPanelOpen = false
      localStorage.setItem('sedona-panel-open', String(false))
    },
    initSavePanel(args: [MenuItem | string]): void {
      if (state.lock) return
      this.savePanel = false
      const [item] = args
      if (typeof item !== 'object') return
      if (item.type !== 'item') return

      this.savePanel = item.save || false
    },
  },
  render(h: CreateElement): VNode {
    let savePanel: VNode | undefined
    if (this.savePanel) {
      let props: Record<string, unknown> = {}
      if (typeof this.savePanel === 'object') {
        props = this.savePanel
      }
      savePanel = h('save-panel', { props })
    }

    return (
      <div id="q-app" class="admin-panel q-dark" style="left: -300px;">
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
            {savePanel}
          </div>
        </div>
      </div>
    )
  },
})
