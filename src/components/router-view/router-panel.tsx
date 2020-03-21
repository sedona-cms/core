import Vue, { VNode } from 'vue'
import RouterView from './router-view'
import MainToolbar from './main-toolbar'

let qApp: HTMLElement | null

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

        const isOpen: boolean = JSON.parse(localStorage.getItem('sedona-panel-open') || 'false')
        if (isOpen) {
            this.open()
        }
    },
    methods: {
        toggle: function (): void {
            if (qApp !== null) {
                qApp.style.left = qApp.style.left === '-300px' ? '0px' : '-300px'
                this.isPanelOpen = qApp.style.left === '0px'
                localStorage.setItem('sedona-panel-open', String(this.isPanelOpen))
            }

        },
        open(): void {
            if (qApp !== null) {
                qApp.style.left = '0px'
                this.isPanelOpen = true
                localStorage.setItem('sedona-panel-open', String(true))
            }
        },
    },
    render(): VNode {
        return (
            <div id="q-app" class="admin-panel q-dark" style="left: -300px">
                <div class="admin-panel--inner fit text-white q-gutter-y-sm shadow-5" style="z-index:1000">
                    <q-btn
                        color="dark"
                        icon={ this.isPanelOpen ? 'menu_open' : 'menu' }
                        round={ true }
                        class="toggle-button"
                        on-click={ this.toggle }
                    />
                    <div class="fit">
                        <main-toolbar />
                        <router-view/>
                    </div>
                </div>
            </div>
        )
    },
})
