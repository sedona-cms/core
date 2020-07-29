import Vue, { VNode, PropType } from 'vue'
import { openURL } from 'quasar'

export default Vue.extend({
  name: 'MediaCard',
  props: {
    src: {
      type: String as PropType<string>,
      required: true,
    },
    // Force the component to maintain an aspect ratio
    ratio: {
      type: [String, Number] as PropType<string | number>,
      default: 4 / 3,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
  },
  data() {
    return {
      isShowRemoveConfirm: false as boolean,
    }
  },
  methods: {
    mouseover(): void {
      if (this.$refs.toolbarWrapper === undefined || this.isShowRemoveConfirm) return
      ;(this.$refs.toolbarWrapper as HTMLElement).style.top = '0'
    },
    mouseleave(): void {
      if (this.$refs.toolbarWrapper === undefined || this.isShowRemoveConfirm) return
      ;(this.$refs.toolbarWrapper as HTMLElement).style.top = '-50px'
    },
    showRemoveConfirm(): void {
      this.isShowRemoveConfirm = true
      ;(this.$refs.toolbarWrapper as HTMLElement).style.top = '-50px'
      if (this.$refs.title !== undefined) {
        (this.$refs.title as HTMLElement).style.bottom = '-50px'
      }

      (this.$refs.removeConfirm as HTMLElement).style.top = '0'
    },
    hideRemoveConfirm(): void {
      this.isShowRemoveConfirm = false
      ;(this.$refs.removeConfirm as HTMLElement).style.top = '-100%'
      if (this.$refs.title !== undefined) {
        (this.$refs.title as HTMLElement).style.bottom = '0'
      }
    },
    remove(): void {
      this.$emit('remove')
      this.hideRemoveConfirm()
    },
    openFullImage(): void {
      openURL(this.src)
    },
  },
  render(): VNode {
    const title = this.title ? (
      <div
        ref="title"
        class="absolute-bottom text-subtitle1 text-center"
        style={{ transition: 'bottom 0.2s cubic-bezier(0.82, 0.085, 0.395, 0.895)' }}>
        {this.title}
      </div>
    ) : undefined

    const toolbar = this.$slots['toolbar'] ?? (
      <q-toolbar dense={true}>
        <q-btn
          icon="settings_overscan"
          flat={true}
          round={true}
          dense={true}
          on-click={this.openFullImage}>
          <q-tooltip>Full image</q-tooltip>
        </q-btn>
        <q-space />
        <q-btn
          icon="delete"
          flat={true}
          round={true}
          dense={true}
          on-click={this.showRemoveConfirm}>
          <q-tooltip>Remove image</q-tooltip>
        </q-btn>
      </q-toolbar>
    )
    const toolBarWrapperStyle = {
      padding: 0,
      top: '-50px',
      transition: 'top 0.15s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
    }

    return (
      <q-card
        flat={true}
        bordered={true}
        dark={true}
        class="bg-grey-7"
        on-mouseover={this.mouseover}
        on-mouseleave={this.mouseleave}>
        <q-img src={this.src} spinner-color="white" ratio={this.ratio}>
          <div ref="toolbarWrapper" class="absolute-top" style={toolBarWrapperStyle}>
            {toolbar}
          </div>
          <div
            ref="removeConfirm"
            class="absolute-top full-height"
            style={{
              background: 'rgba(0,0,0,0.57)',
              transition: 'top 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
              top: '-100%',
            }}>
            <div
              class="q-gutter-sm row fit row inline wrap justify-center items-center content-center"
              style="top:-100%">
              <q-btn icon="close" round={true} outline={true} on-click={this.hideRemoveConfirm} />
              <q-btn icon="delete" round={true} color="negative" on-click={this.remove} />
            </div>
          </div>
          {title}
        </q-img>
      </q-card>
    )
  },
})
