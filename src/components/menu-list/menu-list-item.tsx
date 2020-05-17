import { VNode, PropType } from 'vue'
import mixins from 'vue-typed-mixins'
import { eventBus } from '../../utils/event-bus'
import { menuListItemMixin } from './mixins/menu-list-item-mixin'

export default mixins(menuListItemMixin).extend({
  name: 'MenuListItem',
  props: {
    component: {
      type: String as PropType<string>,
    },
    params: {
      type: Object as PropType<{ [key: string]: any }>,
      required: true,
    },
  },
  methods: {
    menuItemClick(): void {
      const menuItem: MenuItem = {
        type: 'item',
        id: this.id,
        title: this.title,
        subTitle: this.subTitle,
        icon: this.icon,
        component: this.component,
        params: this.params,
      }
      eventBus.emit('core:navigate', menuItem)
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
      </q-item>
    )
  },
})
