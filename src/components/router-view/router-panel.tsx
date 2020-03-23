import Vue, { VNode } from 'vue'
import RouterView from './router-view'
import MainToolbar from './main-toolbar'

let qApp: HTMLElement | null
let nuxtDiv: HTMLElement | null

export default Vue.extend({
  name: 'RouterPanel',
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

    qApp = document.getElementById('q-app')
    nuxtDiv = document.getElementById('__nuxt')

    const isOpen: boolean = JSON.parse(localStorage.getItem('sedona-panel-open') || 'false')
    if (isOpen) {
      this.open()
    }
  },
  methods: {
    toggle(): void {
      if (qApp !== null) {
        if (this.isPanelOpen) {
          this.close()
        } else {
          this.open()
        }
      }
    },
    open(): void {
      if (qApp !== null && nuxtDiv !== null) {
        qApp.style.left = '0px'
        nuxtDiv.style.paddingLeft = '350px'
        this.isPanelOpen = true
        localStorage.setItem('sedona-panel-open', String(true))
      }
    },
    close(): void {
      if (qApp !== null && nuxtDiv !== null) {
        qApp.style.left = '-300px'
        nuxtDiv.style.paddingLeft = 'unset'
        this.isPanelOpen = false
        localStorage.setItem('sedona-panel-open', String(false))
      }
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
