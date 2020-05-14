type MenuItem = {
  id?: string // unique id. Generated automatically if not provided
  title?: string // menu item title. Default <NO TITLE>
  subTitle?: string
  icon?: string // icon name. Uses https://material.io/resources/icons/
  type: 'item' | 'section'
  component?: string | Function
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
