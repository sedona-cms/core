import { Route } from 'vue-router'
// @ts-ignore: will work on runtime, on dev mode only with link
import { generateId } from '@sedona-cms/core/lib/utils/nanoid'
// @ts-ignore: will work on runtime, on dev mode only with link
import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'
// @ts-ignore: will work on runtime, on dev mode only with link
import { router } from '@sedona-cms/core/lib/store/router'

type Props = { [key: string]: unknown }
type NavigateParams = { save: SavePanel | boolean } | undefined

type NavigationItem = {
  title: string
  component: string
  subTitle?: string
  icon?: string
  type?: 'item' | 'section'
  params?: { [key: string]: unknown }
  items?: MenuItem[]
}

type RouteCallback = () => void

let isNavigateLock = false
let isGlobalNavigateLock = false

function checkForLock(to: Route, from: Route, next: RouteCallback): void {
  if (isGlobalNavigateLock) {
    eventBus.emit('core:navigate')
    router.mutations.setLockedRoute(to.path)
    return
  }
  next()
}

eventBus.on('sedona:panel-loaded', () => {
  window.$nuxt.$router.beforeEach(checkForLock)
})

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
    if (!isNavigateLock) {
      eventBus.emit('core:lock-navigate', true)
      isNavigateLock = true
    }
    if (globally && !isGlobalNavigateLock) {
      isGlobalNavigateLock = true
    }
  },
  /**
   * Unlock Admin Panel Navigation
   *
   * @param navigateToRoute if `true` after unlock will navigate to last clicked Admin Panel link
   */
  unlock(navigateToRoute = false): void {
    eventBus.emit('core:lock-navigate', false)
    isNavigateLock = false
    isGlobalNavigateLock = false
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
