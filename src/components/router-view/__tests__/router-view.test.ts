import { mount, createLocalVue } from '@vue/test-utils'
import {
  QAvatar,
  QIcon,
  QItem,
  QItemLabel,
  QItemSection,
  QList,
  QScrollArea,
  QTabPanels,
  QTabPanel,
  QSeparator,
  QToolbarTitle,
  QBtn,
  QToolbar,
  Quasar,
} from 'quasar'
import { eventBus } from '../../../utils/event-bus'
import { generateId } from '../../../utils/nanoid'
import { MenuList } from '../../menu-list'
import { RouterView } from '..'

const localVue = createLocalVue()

localVue.use(Quasar, {
  components: {
    QItemLabel,
    QItemSection,
    QIcon,
    QItem,
    QAvatar,
    QList,
    QScrollArea,
    QTabPanels,
    QTabPanel,
    QSeparator,
    QToolbarTitle,
    QBtn,
    QToolbar,
  },
})

describe('RouterView', () => {
  const menuItems = [
    {
      id: generateId(),
      title: 'Posts',
      type: 'item',
      component: 'posts-view',
    },
    {
      id: generateId(),
      title: 'Meta Section',
      type: 'section',
      items: [
        {
          id: generateId(),
          title: 'Submenu Posts',
          type: 'item',
          component: 'posts-view',
        },
      ],
    },
  ]
  const wrapper = mount(RouterView, {
    localVue,
    mocks: {
      $sedona: {
        config: {
          menuItems,
          toolBar: {
            showHome: true,
            title: '',
            buttons: [],
          },
        },
      },
    },
  })

  test('it can be created with home menu list', () => {
    expect(wrapper.exists()).toBeTruthy()

    const menu = wrapper.findComponent(MenuList)

    expect(menu.exists()).toBeTruthy()
    expect(menu.vm.menuItems).toHaveLength(2)
    expect(menu.vm.menuItems[0]).toEqual(menuItems[0])
    expect(menu.vm.menuItems[1]).toEqual(menuItems[1])
  })

  test('navigate to component', async () => {
    eventBus.emit('core:navigate', menuItems[0])
    await new Promise(resolve => setTimeout(resolve, 500))

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('navigate to section', async () => {
    eventBus.emit('core:navigate', menuItems[1])
    await new Promise(resolve => setTimeout(resolve, 500))

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('to click on menu item', async () => {
    wrapper.find('.q-item').trigger('click')
    await new Promise(resolve => setTimeout(resolve, 500))

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('it can return to home after navigation', async () => {
    eventBus.emit('core:navigate', menuItems[1])
    await new Promise(resolve => setTimeout(resolve, 500))

    eventBus.emit('core:navigate', 'tab-home')
    await new Promise(resolve => setTimeout(resolve, 1000))

    const menu = wrapper.findComponent(MenuList)

    expect(menu.exists()).toBeTruthy()
    expect(menu.vm.menuItems).toEqual(menuItems)
  })
})
