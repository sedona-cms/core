import Vue, { VNode, PropType, CreateElement } from 'vue'
import { eventBus } from '../../utils/event-bus'
import ModalSave from './modal-save'

import './modal.css'

export type ModalSave = {
  label?: string
  color?: string
}

export default Vue.extend({
  name: 'Modal',
  components: {
    ModalSave,
  },
  props: {
    fullScreen: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
    component: {
      type: Function as PropType<() => any>,
      required: true,
    },
    componentProps: {
      type: Object as PropType<object>,
      default: () => {},
    },
    save: {
      type: [Boolean, Object] as PropType<boolean | ModalSave>,
      default: false,
    },
  },
  mounted(): void {
    if (this.fullScreen) return
    const timer = setTimeout(() => {
      clearTimeout(timer)
      // @ts-ignore
      this.$el.style.left = '0px'
    }, 100)

    eventBus.on('core:modal-close', this.close)
  },
  beforeDestroy(): void {
    eventBus.off('core:modal-close', this.close)
  },
  methods: {
    close(): void {
      if (this.fullScreen) {
        this.$emit('close')
        return
      }

      // @ts-ignore
      this.$el.style.left = '-300px'
      const timer = setTimeout(() => {
        clearTimeout(timer)
        this.$emit('close')
      }, 200)
    },
  },
  render(h: CreateElement): VNode {
    const classes = ['modal-panel', 'z-top', 'bg-grey-8']
    if (this.fullScreen) {
      classes.push('fullscreen')
    } else {
      classes.push('modal-panel-width ')
    }

    const style = {}
    if (!this.fullScreen) {
      style['left'] = '-300px'
    }

    const modalComponent = h(this.component, {
      props: {
        ...(typeof this.componentProps === 'object' ? { ...this.componentProps } : {}),
      },
    })

    let savePanel: VNode | undefined
    if (this.save) {
      let props: any = {}
      if (typeof this.save === 'object') {
        props = this.save
      }
      savePanel = h('modal-save', { props })
    }

    return (
      <div class={classes} style={style}>
        <q-toolbar>
          <q-btn icon="close" round={true} dense={true} flat={true} on-click={this.close} />
          <q-toolbar-title>{this.title}</q-toolbar-title>
          {savePanel}
        </q-toolbar>
        <q-scroll-area
          dark={true}
          style="height: calc(100% - 50px); width: 100%; max-width: 300px;">
          {modalComponent}
        </q-scroll-area>
      </div>
    )
  },
})
