import Vue from 'vue'
// @ts-ignore
import { Modal } from '@sedona-cms/core/lib/components'

const config: Readonly<ModuleConfig> = Object.freeze(JSON.parse('<%= JSON.stringify(options) %>'))

type ModalArgs = {
  fullScreen: boolean
  title: string
}

type ModalComponentProp = {
  [key: string]: any
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
    console.log('goBack hook!')
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
