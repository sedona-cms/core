import Vue, { VNode } from 'vue'
import { generateId } from '../../utils/nanoid'
import { eventBus } from '../../utils/event-bus'

export default Vue.extend({
  name: 'MainToolbar',
  methods: {
    buttonClick(menuItem: MenuItem | string): void {
      eventBus.emit('core:navigate', menuItem)
    },
    goHome(): void {
      eventBus.emit('core:navigate', 'tab-home')
    },
  },
  render(): VNode {
    const buttons: VNode[] = []

    if (this.$sedona.toolBarConfig.showHome) {
      buttons.push(
        <q-btn flat={true} round={true} dense={true} class="q-mr-sm" on-click={this.goHome}>
          <q-icon name="home" />
          <q-tooltip content-class="bg-amber text-black shadow-4">Home</q-tooltip>
        </q-btn>
      )
    }

    this.$sedona.toolBarConfig.buttons.forEach((button: ToolbarButton) => {
      const title = button?.title || false
      const icon = button?.icon || 'extension'
      const id = generateId()

      buttons.push(
        <q-btn
          flat={true}
          round={true}
          dense={true}
          class="q-mr-sm"
          on-click={() => this.buttonClick({ id, type: 'item', ...button })}>
          <q-icon name={icon} />
          {title ? <q-tooltip>{button.title}</q-tooltip> : ''}
        </q-btn>
      )
    })

    if (this.$sedona.toolBarConfig.title !== '') {
      buttons.push(<q-toolbar-title>{this.$sedona.toolBarConfig.title}</q-toolbar-title>)
    }

    return <q-toolbar class="bg-grey-7">{buttons}</q-toolbar>
  },
})
