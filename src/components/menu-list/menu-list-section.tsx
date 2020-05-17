import { VNode, PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { menuListItemMixin } from './mixins/menu-list-item-mixin'
import { eventBus } from '../../utils/event-bus'

export default mixins(menuListItemMixin).extend({
  name: 'MenuListSection',
  props: {
    items: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
  },
  methods: {
    menuItemClick(): void {
      const item: SectionMenuItem = {
        type: 'section',
        id: this.id,
        title: this.title,
        subTitle: this.subTitle,
        icon: this.icon,
        items: this.items,
      }
      eventBus.emit('core:navigate', item)
    },
  },
  render(): VNode {
    let subTitle: string | undefined
    if (this.subTitle !== '') {
      subTitle = <q-item-label caption={true}>{this.subTitle}</q-item-label>
    }

    return (
      <q-item clickable={true} on-click={this.menuItemClick}>
        <q-item-section avatar={true}>
          <q-avatar icon={this.icon} color="grey-7" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines={1}>{this.title}</q-item-label>
          {subTitle}
        </q-item-section>
        <q-item-section side={true}>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
      </q-item>
    )
  },
})
