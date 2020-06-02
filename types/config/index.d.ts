type MenuItem = SimpleMenuItem | HeaderMenuItem | SectionMenuItem

type SimpleMenuItem = {
  id?: string
  title?: string
  subTitle?: string
  icon?: string
  type: 'item'
  component?: string | Function
  params?: {
    [key: string]: any
  }
  conditions?: MenuItemCondition[]
  save?: SavePanel | boolean
}

type HeaderMenuItem = {
  id?: string
  title?: string
  type: 'header'
  conditions?: MenuItemCondition[]
}

type SectionMenuItem = {
  id?: string
  title?: string
  subTitle?: string
  icon?: string
  type: 'section'
  items?: MenuItem[]
  conditions?: MenuItemCondition[]
}

type MenuItemCondition =
  | {
      field: 'meta'
      value: { [key: string]: any }
      type: '=' | 'regex'
    }
  | { field: 'path' | 'name'; value: string; type: '=' | 'regex' }

type SavePanel = {
  label?: string // default is `Save`
  color?: string // default is `primary`
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
