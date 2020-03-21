type MenuItem = {
    id?: string
    title: string
    subTitle: string
    type: 'item' | 'category'
    component: string
}

type Config = {
    items: MenuItem[]
}

interface Window {
    _onNuxtLoaded: () => {}
}
