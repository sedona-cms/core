// @ts-ignore
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
// @ts-ignore
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'
// @ts-ignore
import { router } from '@sedona-cms/core/lib/store/router'

type Props = { [key: string]: any }
type NavigateParams = { save: SavePanel | boolean } | undefined

type NavigationItem = {
  title: string
  component: string
  subTitle?: string
  icon?: string
  type?: 'item' | 'section'
  params?: { [key: string]: any }
  items?: MenuItem[]
}

/**
 * Navigation API
 */
export const navigate = {
  /**
   * Navigate to component
   *
   * @example this.$sedona.navigate.go('posts/post.edit', { postId: 123 }, { save: true })
   *
   * @param component component path from `~/admin`
   * @param props component props
   * @param parameters navigation params
   */
  go(component: string, props: Props, parameters: NavigateParams): void {
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
  },
  /**
   * Navigate to section items
   *
   * @param items menu items
   */
  goSection(items: NavigationItem[]): void {
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
  },
  /**
   * Disables Admin Panel view change in `RouterView` component
   *
   * @param globally to lock Vue Router Navigation too
   */
  lock(globally: false): void {
    eventBus.emit('core:lock-navigate', true)
  },
  /**
   * Unlock Admin Panel Navigation
   *
   * @param navigateToRoute if `true` after unlock will navigate to last clicked Admin Panel link
   */
  unlock(navigateToRoute: boolean = false): void {
    eventBus.emit('core:lock-navigate', false)
    if (navigateToRoute) {
      if (router.state.lockedMenuItem !== undefined) {
        eventBus.emit('core:navigate', router.state.lockedMenuItem)
      }
    }
  },
  /**
   * Check for is navigation lock
   *
   * @readonly
   */
  get isLock(): boolean {
    return router.state.lock
  },
}
