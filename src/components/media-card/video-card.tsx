import Vue, { VNode, PropType } from 'vue'

export default Vue.extend({
  name: 'VideoCard',
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
  },
  methods: {
    showRemoveConfirm(): void {
      ;(this.$refs.toolbarWrapper as HTMLElement).style.top = '-60px'
      ;(this.$refs.removeConfirm as HTMLElement).style.top = '0'
    },
    hideRemoveConfirm(): void {
      ;(this.$refs.removeConfirm as HTMLElement).style.top = '-100%'
      ;(this.$refs.toolbarWrapper as HTMLElement).style.top = '0'
    },
    remove(): void {
      this.$emit('remove')
      this.hideRemoveConfirm()
    },
  },
  render(): VNode {
    const toolbar = this.$slots['toolbar'] ?? (
      <q-toolbar dense={true}>
        <q-space />
        <q-btn
          icon="delete"
          flat={true}
          round={true}
          dense={true}
          on-click={this.showRemoveConfirm}>
          <q-tooltip>Remove video</q-tooltip>
        </q-btn>
      </q-toolbar>
    )

    return (
      <q-card flat={true} bordered={true} dark={true} class="bg-grey-7 overflow-hidden">
        <div
          ref="toolbarWrapper"
          class="absolute-top z-top"
          style={{ padding: 0, background: 'rgba(0, 0, 0, 0.51)' }}>
          {toolbar}
        </div>
        <div
          ref="removeConfirm"
          class="absolute-top full-height z-top"
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
        <q-video src={this.src} ratio={this.ratio} />
      </q-card>
    )
  },
})
