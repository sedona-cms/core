import Vue, { PropType, VNode } from 'vue'
import MenuListItem from './menu-list-item'

export default Vue.extend({
  name: 'MenuList',
  components: {
    MenuListItem,
  },
  props: {
    items: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
  },
  render(): VNode {
    const childComponents = new Set<VNode>()

    function createMenuItem(item: MenuItem): VNode {
      return (
        <menu-list-item
          id={item.id}
          title={item.title}
          sub-title={item.subTitle}
          type={item.type}
          icon={item.icon}
          component={item.component}
          items={item.items}
        />
      )
    }

    function createMenuSection(item: MenuItem): VNode[] {
      const result: VNode[] = [<q-item-label header={true}>{item.title}</q-item-label>]
      if (!Array.isArray(item.items)) {
        return result
      }
      for (const menuItem of item.items) {
        result.push(createMenuItem(menuItem))
      }

      return result
    }

    this.items.forEach((item: MenuItem) => {
      switch (item.type) {
        case 'item':
          childComponents.add(createMenuItem(item))
          break
        case 'section':
          createMenuSection(item).map(item => childComponents.add(item))
          break
      }
    })

    return (
      <q-list padding={true} dark={true} class="full-width">
        {[...childComponents]}
      </q-list>
    )
  },
})
