import Vue, { VNode, PropType } from 'vue'

import './modal-panel.css'

export default Vue.extend({
  name: 'ModalPanel',
  props: {
    fullScreen: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
  },
  mounted(): void {
    if (this.fullScreen) return
    const timer = setTimeout(() => {
      clearTimeout(timer)
      // @ts-ignore
      this.$el.style.left = '0px'
    }, 100)
  },
  methods: {
    close(): void {
      // @ts-ignore
      this.$el.style.left = '-300px'
    },
  },
  render(): VNode {
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

    return (
      <div class={classes} style={style}>
        <q-toolbar>
          <q-btn icon="close" round={true} dense={true} flat={true} on-click={this.close} />
          <q-toolbar-title>{this.title}</q-toolbar-title>
          <q-btn label="Select" color="primary" />
        </q-toolbar>
        Modal Panel
      </div>
    )
  },
})
