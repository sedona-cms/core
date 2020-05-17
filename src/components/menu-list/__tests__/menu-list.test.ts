import { mount, createLocalVue } from '@vue/test-utils'
import { Quasar, QItemLabel, QItemSection, QIcon, QItem, QAvatar, QList } from 'quasar'
import { MenuList } from '..'
import { generateId } from '../../../utils/nanoid'
import { eventBus } from '../../../utils/event-bus'

const localVue = createLocalVue()

localVue.use(Quasar, {
  components: {
    QItemLabel,
    QItemSection,
    QIcon,
    QItem,
    QAvatar,
    QList,
  },
})

describe('MenuList', () => {
  test('it can be exists with no menu items', () => {
    const wrapper = mount(MenuList, {
      localVue,
      propsData: {
        items: [],
      },
    })
    const vm = wrapper.vm

    expect(wrapper.exists()).toBeTruthy
    expect(vm.menuItems).toBeInstanceOf(Array)
    expect(vm.menuItems).toHaveLength(0)
  })

  test('it can be render menu items', async () => {
    const items = [
      {
        id: generateId(),
        title: 'Post List',
        type: 'item',
        component: 'posts/posts-view',
      },
      {
        id: generateId(),
        title: 'SEO',
        type: 'section',
        items: [],
      },
    ]

    const wrapper = mount(MenuList, {
      localVue,
      propsData: {
        items,
      },
    })
    const vm = wrapper.vm

    expect(wrapper.exists()).toBeTruthy
    expect(vm.menuItems).toBeInstanceOf(Array)
    // expect(vm.menuItems).toHaveLength(2)

    // console.log(wrapper.findAll('.q-item__label').length)

    expect(wrapper.get('.q-item__label').text()).toEqual('Post List')
    expect(wrapper.get('.q-avatar__content').text()).toEqual('folder')

    eventBus.on('core:navigate', ([item]) => {
      expect(item).toBeInstanceOf(Object)
      expect(item).toHaveProperty('id', items[0].id)
      expect(item).toHaveProperty('title', items[0].title)
      expect(item).toHaveProperty('component', items[0].component)
      expect(item).toHaveProperty('subTitle', '')
      expect(item).toHaveProperty('icon', 'folder')
      expect(item).toHaveProperty('type', 'item')
      expect(item).toHaveProperty('params', {})
    })

    wrapper.find('.q-item').trigger('click')

    // await vm.$nextTick()

    // console.log(wrapper.get('.q-toolbar__title'))
  })
})
