import { mount, createLocalVue } from '@vue/test-utils'
import { Quasar, QBtn } from 'quasar'
import { eventBus } from '../../../utils/event-bus'
import { SavePanel } from '..'

const localVue = createLocalVue()

localVue.use(Quasar, {
  components: {
    QBtn,
  },
})

describe('SavePanel', () => {
  test('it can be render with default props', () => {
    const wrapper = mount(SavePanel, {
      localVue,
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('it can be render with provided props', () => {
    const wrapper = mount(SavePanel, {
      localVue,
      propsData: {
        label: 'Save Post',
        color: 'brown-5',
        size: 'md',
      },
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('it can be render with loading state', () => {
    const wrapper = mount(SavePanel, {
      localVue,
    })

    expect(wrapper.exists()).toBeTruthy()

    let isFired = false
    eventBus.on('core:save-loading', () => {
      isFired = true
      expect(wrapper.vm.loading).toBeTruthy()
    })
    eventBus.emit('core:save-loading', true)

    expect(isFired).toBeTruthy()
  })

  test('it can be render with disable state', () => {
    const wrapper = mount(SavePanel, {
      localVue,
    })

    expect(wrapper.exists()).toBeTruthy()

    let isFired = false
    eventBus.on('core:save-disable', () => {
      isFired = true
      expect(wrapper.vm.disable).toBeTruthy()
    })
    eventBus.emit('core:save-disable', true)

    expect(isFired).toBeTruthy()
  })

  test('it can be catch a click event', () => {
    const wrapper = mount(SavePanel, {
      localVue,
    })

    let isFired = false
    eventBus.on('core:save-click', () => {
      isFired = true
    })
    wrapper.findComponent(QBtn).trigger('click')

    expect(isFired).toBeTruthy()
  })
})
