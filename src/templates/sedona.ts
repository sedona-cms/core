const config: Readonly<ModuleConfig> = Object.freeze(JSON.parse('<%= JSON.stringify(options) %>'))

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
}
