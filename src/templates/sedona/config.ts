type ToolbarConfig = {
  showHome: boolean
  title: string
  buttons: ToolbarButton[]
}

const appConfig: Readonly<ModuleConfig> = Object.freeze(
  JSON.parse('<%= JSON.stringify(options) %>')
)

export const config = {
  get menuItems(): readonly MenuItem[] {
    return Object.freeze(appConfig?.items || [])
  },

  get toolBar(): Readonly<ToolbarConfig> {
    const defaultToolbarConfig: ToolbarConfig = {
      showHome: true,
      title: '',
      buttons: [],
    }

    return Object.freeze(Object.assign({}, defaultToolbarConfig, appConfig?.toolbar || {}))
  },
}
