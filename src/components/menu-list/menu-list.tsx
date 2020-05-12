import Vue, { PropType, VNode, CreateElement } from 'vue'
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
  render(h: CreateElement): VNode {
    const childComponents = new Set<VNode>()

    function createMenuItem(item: MenuItem): VNode {
      const props: MenuItem = {
        id: item.id,
        ...(item.title !== undefined ? { title: item.title } : {}),
        ...(item.subTitle !== undefined ? { subTitle: item.subTitle } : {}),
        ...(item.icon !== undefined ? { icon: item.icon } : {}),
        ...(item.component !== undefined ? { component: item.component } : {}),
        ...(item.type !== undefined ? { type: item.type } : { type: 'item' }),
        ...(item.params !== undefined ? { params: item.params } : {}),
        ...(item.items !== undefined ? { items: item.items } : {}),
      }

      return h('menu-list-item', { props })
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
