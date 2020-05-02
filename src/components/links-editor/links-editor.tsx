import Vue, { VNode, PropType } from 'vue'
import { generateId } from '../../utils/nanoid'
import LinksEditorItem from './links-editor-item'

type Link = {
  id: string
  title: string
  href: string
}

type MenuItemEvent = {
  id: string
  field: 'title' | 'href'
  value: string
}

export default Vue.extend({
  name: 'LinksEditor',
  props: {
    items: {
      type: Array as PropType<Link[]>,
      required: true,
      validator(value: Link[]): boolean {
        return value.every(item => {
          const keys = Object.keys(item)
          return keys.includes('id') && keys.includes('title') && keys.includes('href')
        })
      },
    },
  },
  components: {
    LinksEditorItem,
  },
  data() {
    return {
      menuItems: JSON.parse(JSON.stringify(this.items)) as Link[],
    }
  },
  watch: {
    items(value: Link[]): void {
      this.menuItems = JSON.parse(JSON.stringify(value))
    },
  },
  methods: {
    menuItemChange({ id, field, value }: MenuItemEvent): void {
      const menuIndex = this.menuItems.findIndex(item => item.id === id)
      if (menuIndex === -1) {
        throw new Error(`Menu Item with id ${id} not found`)
      }
      this.$set(this.menuItems[menuIndex], field, value)
      this.menuChange()
    },
    menuChange(): void {
      this.$emit('change', { items: this.menuItems })
    },
    addMenuItem(): void {
      this.menuItems.push({
        id: generateId(),
        title: 'Menu Title',
        href: '/',
      })
      this.menuChange()
    },
  },
  render(): VNode {
    const toolbar = (
      <q-toolbar>
        <q-btn icon="add" round={true} dense={true} flat={true} on-click={this.addMenuItem}>
          <q-tooltip>Add Menu Item</q-tooltip>
        </q-btn>
      </q-toolbar>
    )

    const items: VNode[] = []
    for (const menuItem of this.menuItems) {
      items.push(
        <links-editor-item
          id={menuItem.id}
          title={menuItem.title}
          href={menuItem.href}
          on-change={this.menuItemChange}
        />
      )
    }

    return (
      <div class="fit relative-position">
        {toolbar}
        <q-list dark={true} style="padding-bottom:120px">
          {...items}
        </q-list>
      </div>
    )
  },
})
