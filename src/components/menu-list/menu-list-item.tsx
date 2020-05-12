import Vue, { VNode, PropType } from 'vue'
import { eventBus } from '../../utils/event-bus'

export default Vue.extend({
  name: 'MenuListItem',
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      default: '<NO TITLE>',
    },
    subTitle: {
      type: String as PropType<string>,
      default: '',
    },
    icon: {
      type: String as PropType<string>,
      default: 'folder',
    },
    component: {
      type: String as PropType<string>,
    },
    items: {
      type: Array as PropType<MenuItem[]>,
      default: () => [],
    },
    type: {
      type: String as PropType<'item' | 'section'>,
      validator: value => ['item', 'section'].includes(value),
    },
    params: {
      type: Object as PropType<{ [key: string]: any }>,
    },
  },
  methods: {
    menuItemClick(): void {
      const menuItem: MenuItem = {
        id: this.id,
        title: this.title,
        subTitle: this.subTitle,
        icon: this.icon,
        type: this.type,
      }
      if (this.params !== undefined) {
        menuItem.params = this.params
      }

      switch (this.type) {
        case 'item':
          menuItem.component = this.component
          break
        case 'section':
          menuItem.items = this.items
          break
      }
      eventBus.emit('core:navigate', menuItem)
    },
  },
  render(): VNode {
    let subTitle: string | undefined
    if (this.subTitle !== '') {
      subTitle = <q-item-label caption={true}>{this.subTitle}</q-item-label>
    }

    const iconArrow: VNode | undefined =
      this.type === 'section' ? (
        <q-item-section side={true}>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
      ) : undefined

    return (
      <q-item clickable={true} on-click={this.menuItemClick}>
        <q-item-section avatar={true}>
          <q-avatar icon={this.icon} color="grey-7" text-color="white" />
        </q-item-section>
        <q-item-section>
          <q-item-label lines={1}>{this.title}</q-item-label>
          {subTitle}
        </q-item-section>
        {iconArrow}
      </q-item>
    )
  },
})
