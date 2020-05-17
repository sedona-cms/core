import Vue, { PropType, VNode, CreateElement } from 'vue'
import MenuListItem from './menu-list-item'
import MenuListHeader from './menu-list-header'
import MenuListSection from './menu-list-section'

function isConditionTrue(menuItem: MenuItem): boolean {
  if (menuItem.conditions === undefined) return true
  for (const item of menuItem.conditions) {
    if (item.type === '=') {
      if (item.field === 'meta') {
        // const result = this.$route[item.field] === item.value
      } else {
        // this.$route[item.field] === item.value
      }
    }
  }
  return false
}

export default Vue.extend({
  name: 'MenuList',
  components: {
    MenuListItem,
    MenuListHeader,
    MenuListSection,
  },
  props: {
    items: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
  },
  computed: {
    menuItems(): MenuItem[] {
      const items: MenuItem[] = []
      for (const menuItem of this.items) {
        switch (menuItem.type) {
          case 'item': {
            if (menuItem.conditions === undefined || isConditionTrue.call(this, menuItem)) {
              items.push(menuItem)
            }
            break
          }
          case 'section':
            break
        }
      }
      return items
    },
  },
  render(h: CreateElement): VNode {
    const childComponents = new Set<VNode>()

    this.items.forEach((item: MenuItem) => {
      switch (item.type) {
        case 'item':
          childComponents.add(
            <menu-list-item
              id={item.id}
              component={item.component}
              title={item.title ?? '<NO TITLE>'}
              sub-title={item.subTitle ?? ''}
              icon={item.icon ?? 'folder'}
              params={item.params ?? {}}
            />
          )
          break
        case 'header':
          childComponents.add(<menu-list-header title={item.title} />)
          break
        case 'section':
          childComponents.add(
            <menu-list-section
              id={item.id}
              title={item.title}
              sub-title={item.subTitle ?? ''}
              icon={item.icon ?? 'folder'}
              items={item.items ?? []}
            />
          )
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
