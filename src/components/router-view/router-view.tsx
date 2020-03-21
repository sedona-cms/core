import Vue, { VNode } from 'vue'

export default Vue.extend({
    name: 'RouterView',
    components: {},
    data() {
        return {
            activeTab: 'tab-home', // Tab ID
            items: {}, // Menu Items
        }
    },
    render(): VNode {
        const result: VNode[] = []
        for (const index of [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) {
            result.push(<p>{index}</p>)
        }
        return <div>{ result }</div>
    },
})
