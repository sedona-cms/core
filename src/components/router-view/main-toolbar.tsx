import Vue, { VNode } from 'vue'
import { uid } from 'quasar'

const defaultToolbarConfig: ToolbarConfig = {
    showHome: true,
    title: '',
    buttons: [],
}

export default Vue.extend({
    name: 'MainToolbar',
    computed: {
        config(): ToolbarConfig {
            return Object.assign({}, defaultToolbarConfig, this.$sedona.config?.toolbar || {})
        },
    },
    methods: {
        buttonClick({ id, title, component, icon = 'folder' }) {
            console.log(id, title, component)
            // this.$admin.goTo({ id, title, icon, component })
        },
    },
    render(): VNode {
        const buttons: VNode[] = []

        if (this.config.showHome) {
            buttons.push(
                <q-btn flat={ true } round={ true } dense={ true } class="q-mr-sm">
                    <q-icon name="home"/>
                    <q-tooltip content-class="bg-amber text-black shadow-4">Home</q-tooltip>
                </q-btn>,
            )
        }

        this.config.buttons.forEach((button: ToolbarButton) => {
            const title = button?.title || false
            const icon = button?.icon || 'extension'
            const id = uid()

            buttons.push(
                <q-btn
                    flat={ true }
                    round={ true }
                    dense={ true }
                    class="q-mr-sm"
                    on-click={ () => this.buttonClick({ id, ...button }) }
                >
                    <q-icon name={ icon }/>
                    { title ? <q-tooltip>{ button.title }</q-tooltip> : '' }
                </q-btn>,
            )
        })

        if (this.config.title !== '') {
            buttons.push(<q-toolbar-title>{ this.config.title }</q-toolbar-title>)
        }

        return <q-toolbar class="bg-grey-7">{ buttons }</q-toolbar>
    },
})
