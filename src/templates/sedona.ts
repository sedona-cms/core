import Vue from 'vue'
import { Modal } from '@sedona-cms/core/lib/components'

const config: Readonly<ModuleConfig> = Object.freeze(JSON.parse('<%= JSON.stringify(options) %>'))

type ModalArgs = {
  fullScreen: boolean
  title: string
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

  async modal(component: string | object, args: ModalArgs): Promise<void> {
    let modalComponent
    switch (typeof component) {
      case 'string': {
        modalComponent = () => import(`~/admin/${component}`)
        break
      }
      case 'object':
        modalComponent = Vue.extend(component)
        break
      default:
        throw new TypeError(`Wrong component type ${component}`)
    }

    const modal = new Modal({
      parent: window.$admin,
      propsData: {
        fullScreen: args.fullScreen ?? false,
        title: args.title ?? '',
        component: modalComponent,
      },
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
