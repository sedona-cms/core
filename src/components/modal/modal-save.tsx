import Vue, { VNode, PropType } from 'vue'
import { eventBus } from '../../utils/event-bus'

export default Vue.extend({
  name: 'ModalSave',
  props: {
    label: {
      type: String as PropType<string>,
      default: 'Save',
    },
    color: {
      type: String as PropType<string>,
      default: 'primary',
    },
  },
  data() {
    return {
      loading: false as boolean,
      disable: false as boolean,
    }
  },
  mounted(): void {
    eventBus.on('core:save-loading', this.__saveLoading)
    eventBus.on('core:save-disable', this.__saveDisable)
  },
  beforeDestroy(): void {
    eventBus.off('core:save-loading', this.__saveLoading)
    eventBus.off('core:save-disable', this.__saveDisable)
  },
  methods: {
    __saveLoading(value: [boolean]): void {
      this.loading = Boolean(value?.[0])
    },
    __saveDisable(value: [boolean]): void {
      this.disable = Boolean(value?.[0])
    },
    __OK() {
      this.$emit('core:save-click')
    },
  },
  render(): VNode {
    return (
      <q-btn
        label={this.label}
        color={this.color}
        loading={this.loading}
        disable={this.disable}
        on-click={this.__OK}
      />
    )
  },
})
