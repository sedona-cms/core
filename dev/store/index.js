import { generateId } from '@sedona-cms/core/lib/utils/nanoid'

export const state = () => ({
  menuItems: [
    {
      id: generateId(),
      title: 'Home',
      href: '/',
    },
    {
      id: generateId(),
      title: 'About',
      href: '/about',
    },
    {
      id: generateId(),
      title: 'Features',
      href: '/features',
    },
  ],
})

export const getters = {}

export const mutations = {
  SET_MENU(state, { items }) {
    state.menuItems = items
  },
}

export const actions = {}
