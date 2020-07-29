import Vue, { VNode, PropType } from 'vue'
import { eventBus } from '../../utils/event-bus'

export default Vue.extend({
  name: 'SavePanel',
  props: {
    label: {
      type: String as PropType<string>,
      default: 'Save',
    },
    color: {
      type: String as PropType<string>,
      default: 'primary',
    },
    size: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
      default: 'lg',
      validator(value: string): boolean {
        return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
      },
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
    __saveLoading(value: boolean): void {
      this.loading = Boolean(value?.[0])
    },
    __saveDisable(value: [boolean]): void {
      this.disable = Boolean(value?.[0])
    },
  },
  render(): VNode {
    return (
      <div class="q-pa-md full-width">
        <q-btn
          label={this.label}
          color={this.color}
          size={this.size}
          loading={this.loading}
          disable={this.disable}
          class="full-width"
          on-click={() => eventBus.emit('core:save-click')}
        />
      </div>
    )
  },
})
