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

  async showModalPanel(
    component: string,
    { fullScreen = false }: { fullScreen: boolean }
  ): Promise<void> {
    // @ts-ignore
    const { ModalPanel } = await import('@sedona-cms/core/lib/components')
    const modal = new ModalPanel({
      parent: window.$admin,
      propsData: { fullScreen: false, title: 'Open File' },
    })
    const admin: HTMLElement | null = document.querySelector('.admin-panel')
    if (admin === null) {
      throw new Error('Admin Panel not found in DOM')
    }
    admin.prepend(modal.$mount().$el)
  }
}
