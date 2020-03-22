type MenuItem = {
    id?: string
    title: string
    subTitle: string
    type: 'item' | 'category'
    component: string
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

interface Window {
    _onNuxtLoaded: () => {}
}
