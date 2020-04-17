type MenuItem = {
  id?: string
  title?: string
  subTitle?: string
  icon?: string
  type: 'item' | 'section'
  component: string | Function
  params?: {
    [key: string]: any
  }
  items?: MenuItem[]
}

type ToolbarButton = {
  title: string
  icon: string
  component: string
}

type ToolbarConfig = {
  showHome: boolean
  title: string
  buttons: ToolbarButton[]
}

type ModuleConfig = {
  toolbar?: ToolbarConfig
  items: MenuItem[]
}
