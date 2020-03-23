const config: Readonly<ModuleConfig> = Object.freeze(JSON.parse('<%= JSON.stringify(options) %>'))

export class Sedona {
  get menuItems(): MenuItem[] {
    return config?.items || []
  }

  get toolBarConfig(): ToolbarConfig {
    const defaultToolbarConfig: ToolbarConfig = {
      showHome: true,
      title: '',
      buttons: [],
    }
    return Object.assign({}, defaultToolbarConfig, config?.toolbar || {})
  }

  goBack(): void {
    console.log('goBack hook!')
  }
}
