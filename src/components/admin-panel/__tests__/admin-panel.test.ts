import { mount, createLocalVue } from '@vue/test-utils'
import { AdminPanel } from '..'
import MainToolbar from '../main-toolbar'
import { Quasar, QToolbar, QToolbarTitle, QBtn, QTooltip, QIcon } from 'quasar'
import NuxtApp from './stubs/nuxt-app'

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
  toolBarConfig: {
    title: 'Toolbar Title',
    showHome: true,
    buttons: [],
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
