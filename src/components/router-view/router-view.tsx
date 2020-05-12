import Vue, { VNode } from 'vue'
import { MenuList } from '../menu-list'
import { ItemTabContainer } from '../item-tab-container'
import { eventBus } from '../../utils/event-bus'

type CurrentMenuItems = {
  [id: string]: MenuItem
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
  mounted(): void {
    eventBus.on('core:navigate', this.navigate)
  },
  beforeDestroy(): void {
    eventBus.off('core:navigate', this.navigate)
  },
  methods: {
    async navigate(args: [MenuItem | string]): Promise<void> {
      const [item] = args
      switch (typeof item) {
        case 'object': {
          if (`tab-${item.id}` === this.activeTab) {
            return
          }
          await this.menuItemClick(Object.assign(item, { icon: 'folder', params: item.params }))
          break
        }
        case 'string': {
          if (this.activeTab !== item) {
            this.activeTab = item
          }
          break
        }
      }
    },
    async menuItemClick(item: MenuItem): Promise<void> {
      if (item.type === 'section') {
        item.component = MenuList
      }
      this.$set(this.items, String(item.id), item)
      await this.$nextTick()
      this.activeTab = `tab-${item.id}`
    },
  },
  render(): VNode {
    const itemKeys = Object.keys(this.items)

    if (itemKeys.length === 0) {
      const adminMenu = <menu-list items={this.$sedona.menuItems} on-click={this.menuItemClick} />
      this.$set(this.items, 'home', { id: 'home', component: adminMenu })
    }

    const views = new Set<VNode>()

    itemKeys.forEach(menuId => {
      const item = this.items[menuId]
      views.add(
        <q-tab-panel name={`tab-${item.id}`} style="padding:5px 0px">
          <item-tab-container
            title={item?.title || ''}
            subTitle={item?.subTitle || ''}
            icon={item?.icon || 'folder'}
            component={item.component}
            items={item?.items || []}
            params={item?.params || {}}
          />
        </q-tab-panel>
      )
    })

    return (
      <q-scroll-area dark={true} style="height: calc(100% - 50px); width: 100%; max-width: 300px;">
        <q-tab-panels
          ref="tabPanels"
          class="fit"
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
