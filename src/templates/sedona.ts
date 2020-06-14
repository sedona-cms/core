import { modal } from './sedona/modal'
import { navigate } from './sedona/navigate'
import { config } from './sedona/config'

// const config: Readonly<ModuleConfig> = Object.freeze(JSON.parse('<%= JSON.stringify(options) %>'))

export const sedona = {
  config,
  modal,
  navigate,

  // get menuItems(): readonly MenuItem[] {
  //  return Object.freeze(config?.items || [])
  // },

  /* get toolBarConfig(): Readonly<ToolbarConfig> {
    const defaultToolbarConfig: ToolbarConfig = {
      showHome: true,
      title: '',
      buttons: [],
    }
    return Object.freeze(Object.assign({}, defaultToolbarConfig, config?.toolbar || {}))
  }, */
}
