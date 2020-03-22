import Vue, { PropType } from 'vue'

const state = new Set()

export default Vue.extend({
    name: 'Sedona',
    props: {
        config: {
            type: Object as PropType<ModuleConfig>,
            required: true,
        },
    },
    methods: {
        log() {
            console.log(this.config.items)
        },
    },
})
