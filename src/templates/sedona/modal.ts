import Vue, { VueConstructor } from 'vue'
// @ts-ignore: will work on runtime, on dev mode only with link
import { Modal } from '@sedona-cms/core/lib/components'
// @ts-ignore: will work on runtime, on dev mode only with link
import { ModalSave } from '@sedona-cms/core/lib/components/modal'

type ModalArgs = {
  fullScreen?: boolean
  title?: string
  save?: boolean | ModalSave
}

type ModalComponentProp = {
  [key: string]: unknown
}

type ModalComponentFunction = () => void

export const modal = {
  /**
   * Show custom component in modal wrapper
   *
   * @param component
   * @param args
   * @param props
   */
  async show(
    component: string | Record<string, unknown>,
    args: ModalArgs,
    props?: ModalComponentProp[]
  ): Promise<void> {
    let modalComponent: ModalComponentFunction | VueConstructor<Record<never, unknown> & Vue>
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
  },
}
