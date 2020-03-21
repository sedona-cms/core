import Vue, { VNode } from 'vue'

export default Vue.extend({
    name: 'MainToolbar',
    render(createE): VNode {
        const buttons: VNode[] = []

        buttons.push(
            <q-btn flat={ true } round={ true } dense={ true } class="q-mr-sm">
                <q-icon name="home"/>
                <q-tooltip content-class="bg-amber text-black shadow-4">Home</q-tooltip>
            </q-btn>,
        )

        return <q-toolbar class="bg-grey-7">{ buttons }</q-toolbar>
    },
})
