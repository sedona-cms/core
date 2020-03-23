export class Sedona {
  private readonly config: ModuleConfig

  constructor(config: ModuleConfig) {
    this.config = Object.freeze(config)
  }

  get menuItems(): MenuItem[] {
    return this.config?.items || []
  }

  get toolBarConfig(): ToolbarConfig {
    const defaultToolbarConfig: ToolbarConfig = {
      showHome: true,
      title: '',
      buttons: [],
    }
    return Object.assign({}, defaultToolbarConfig, this.config?.toolbar || {})
  }

  goBack(): void {
    console.log('goBack hook!')
  }
}
