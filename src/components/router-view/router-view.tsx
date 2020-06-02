import Vue, { VNode, CreateElement } from 'vue'
import { MenuList } from '../menu-list'
import { ItemTabContainer } from '../item-tab-container'
import { eventBus } from '../../utils/event-bus'

type RouteSectionMenuItem = SectionMenuItem & { component: string | Function }

type RouteMenuItem = SimpleMenuItem | RouteSectionMenuItem

type CurrentMenuItems = {
  [id: string]: RouteMenuItem
}

export default Vue.extend({
  name: 'RouterView',
  components: {
    MenuList,
    ItemTabContainer,
  },
  data() {
    return {
      activeTab: 'tab-home' as string, // Tab ID
      items: {} as CurrentMenuItems, // Menu Items
    }
  },
  computed: {
    isSavePanel(): boolean {
      let result = false
      const activeItem = this.items[this.activeTab.replace('tab-', '')]
      if (activeItem.type === 'item') {
        result = Boolean(activeItem.save)
      }

      return result
    },
  },
  mounted(): void {
    eventBus.on('core:navigate', this.navigate)
  },
  beforeDestroy(): void {
    eventBus.off('core:navigate', this.navigate)
  },
  methods: {
    async navigate(args: [MenuItem | string]): Promise<void> {
      const [item] = args
      if (typeof item === 'string') {
        if (this.activeTab !== item) {
          this.activeTab = item
        }
        return
      }

      switch (item.type) {
        case 'item': {
          const menuitem: RouteMenuItem = {
            ...item,
            type: 'item',
          }
          this.$set(this.items, String(item.id), menuitem)
          break
        }
        case 'section': {
          const menuitem: RouteMenuItem = {
            ...item,
            type: 'section',
            component: MenuList,
          }
          this.$set(this.items, String(item.id), menuitem)
          break
        }
      }

      await this.$nextTick()
      this.activeTab = `tab-${item.id}`
    },
  },
  render(h: CreateElement): VNode {
    const itemKeys = Object.keys(this.items)

    if (itemKeys.length === 0) {
      const adminMenu = <menu-list items={this.$sedona.menuItems} />
      this.$set(this.items, 'home', { id: 'home', component: adminMenu, type: 'item' })
    }

    const views = new Set<VNode>()

    itemKeys.forEach(menuId => {
      const item = this.items[menuId]
      const props: any = {
        title: item?.title || '',
        subTitle: item?.subTitle || '',
        icon: item?.icon || 'folder',
        component: item.component,
      }
      switch (item.type) {
        case 'item': {
          props.params = item?.params || {}
          props.save = item.save || false
          break
        }
        case 'section':
          props.items = item.items
          break
      }

      const container = h('item-tab-container', { props })

      views.add(
        <q-tab-panel name={`tab-${item.id}`} style="padding:5px 0px">
          {container}
        </q-tab-panel>
      )
    })

    const offset: number = this.isSavePanel ? 140 : 50

    return (
      <q-scroll-area
        dark={true}
        style={{ height: `calc(100% - ${offset}px)`, width: '100%', 'max-width': '300px' }}>
        <q-tab-panels
          ref="tabPanels"
          style="color:inherit;background:inherit;"
          animated={true}
          keepAlive={false}
          infinite={true}
          value={this.activeTab}>
          {[...views]}
        </q-tab-panels>
      </q-scroll-area>
    )
  },
})
