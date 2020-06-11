import Vue from 'vue'

// @ts-ignore
import { Modal } from '@sedona-cms/core/lib/components'
// @ts-ignore
import { ModalSave } from '@sedona-cms/core/lib/components/modal'
// @ts-ignore
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'
// @ts-ignore
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
// @ts-ignore
import { router } from '@sedona-cms/core/lib/store/router'

const config: Readonly<ModuleConfig> = Object.freeze(JSON.parse('<%= JSON.stringify(options) %>'))

type ModalArgs = {
  fullScreen?: boolean
  title?: string
  save?: boolean | ModalSave
}

type ModalComponentProp = {
  [key: string]: any
}

type NavigationItem = {
  title: string
  component: string
  subTitle?: string
  icon?: string
  type?: 'item' | 'section'
  params?: { [key: string]: any }
  items?: MenuItem[]
}

export class Sedona {
  get menuItems(): readonly MenuItem[] {
    return Object.freeze(config?.items || [])
  }

  get toolBarConfig(): Readonly<ToolbarConfig> {
    const defaultToolbarConfig: ToolbarConfig = {
      showHome: true,
      title: '',
      buttons: [],
    }
    return Object.freeze(Object.assign({}, defaultToolbarConfig, config?.toolbar || {}))
  }

  goBack(): void {
    // @ToDo add api for navigate to previous view
    console.log('navigate back')
  }

  navigate(
    component: string,
    props: { [key: string]: any },
    parameters: { save: SavePanel | boolean } | undefined
  ): void {
    const menuItem: MenuItem = {
      id: generateId(),
      component,
      type: 'item',
      params: props ?? {},
    }
    if (parameters?.save) {
      menuItem.save = parameters.save
    }
    eventBus.emit('core:navigate', menuItem)
  }

  navigateItems(items: NavigationItem[]): void {
    const menuItem: MenuItem = {
      id: generateId(),
      type: 'section',
      items: [],
    }
    for (const item of items) {
      menuItem.items?.push({
        id: generateId(),
        type: item.type ?? 'item',
        title: item.title,
        component: item.component,
        subTitle: item.subTitle ?? '',
        params: item.params ?? {},
        icon: item.icon,
        items: item.items,
      })
    }
    eventBus.emit('core:navigate', menuItem)
  }

  lockNavigate(): void {
    eventBus.emit('core:lock-navigate', true)
  }

  unlockNavigate(navigateToRoute: boolean = false): void {
    eventBus.emit('core:lock-navigate', false)
    if (navigateToRoute) {
      if (router.state.lockedMenuItem !== undefined) {
        eventBus.emit('core:navigate', router.state.lockedMenuItem)
      }
    }
  }

  get isNavigateLock(): boolean {
    return router.state.lock
  }

  async modal(
    component: string | object,
    args: ModalArgs,
    props?: ModalComponentProp[]
  ): Promise<void> {
    let modalComponent
    switch (typeof component) {
      case 'string': {
        modalComponent = () => import(`~/admin/${component}`)
        break
      }
      case 'object':
        modalComponent = Vue.extend(component)
        break
      case 'function':
        modalComponent = component
        break
      default:
        throw new TypeError(`Wrong component type ${component}`)
    }

    const propsData = {
      fullScreen: args?.fullScreen || false,
      title: args?.title || '',
      save: args.save || false,
      component: modalComponent,
    }
    if (props !== undefined) {
      propsData['componentProps'] = props
    }

    const modal = new Modal({
      parent: window.$admin,
      propsData,
    })

    const admin: HTMLElement | null = document.querySelector('.admin-panel')
    if (admin === null) {
      throw new Error('Admin Panel not found in DOM')
    }
    admin.prepend(modal.$mount().$el)

    modal.$on('close', () => {
      modal.$destroy()
      modal.$el.remove()
    })
  }
}
