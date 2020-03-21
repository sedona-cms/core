import Vue, { VNode } from 'vue'
import RouterView from './router-view'

export default Vue.extend({
    name: 'RouterPanel',
    components: {
        RouterView,
    },
    data() {
        return {
            isPanelOpen: false as Boolean,
        }
    },
    methods: {
        toggle: function (): void {
            const qApp = document.getElementById('q-app')
            if (qApp !== null) {
                qApp.style.left = qApp.style.left === '-300px' ? '0' : '-300px'
                this.isPanelOpen = qApp.style.left === '0px'
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
                        round={ true }
                        class="toggle-button"
                        on-click={ this.toggle }
                    />
                    <div class="row self-stretch fit">
                        <router-view/>
                    </div>
                </div>
            </div>
        )
    },
})
