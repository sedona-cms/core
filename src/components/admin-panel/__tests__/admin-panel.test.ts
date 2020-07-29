import { mount, createLocalVue } from '@vue/test-utils'
import MainToolbar from '../main-toolbar'
import { Quasar, QToolbar, QToolbarTitle, QBtn, QTooltip, QIcon } from 'quasar'

const localVue = createLocalVue()

localVue.use(Quasar, {
  components: {
    QToolbar,
    QToolbarTitle,
    QBtn,
    QTooltip,
    QIcon,
  },
})

const $sedona = {
  config: {
    menuItems: [],
    toolBar: {
      title: 'Toolbar Title',
      showHome: true,
      buttons: [],
    },
  },
}

describe('', () => {
  const wrapper = mount(MainToolbar, {
    // parentComponent: NuxtApp,
    localVue,
    mocks: {
      $sedona,
    },
  })

  test('it can be exists', () => {
    // const vm = wrapper.vm

    expect(wrapper.exists()).toBeTruthy
  })
})
