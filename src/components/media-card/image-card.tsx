import Vue, { VNode, PropType } from 'vue'

export default Vue.extend({
  name: 'MediaCard',
  props: {
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
      showRemoveConfirm: false,
    }
  },
  methods: {
    mouseover(): void {
      if (this.$refs.toolbarWrapper === undefined) return
      ;(this.$refs.toolbarWrapper as HTMLElement).style.top = '0'
    },
    mouseleave(): void {
      if (this.$refs.toolbarWrapper === undefined) return
      ;(this.$refs.toolbarWrapper as HTMLElement).style.top = '-50px'
    },
  },
  render(): VNode {
    const title = this.title ? (
      <div class="absolute-bottom text-subtitle1 text-center">{this.title}</div>
    ) : undefined

    const toolbar = this.$slots['toolbar'] ?? (
      <q-toolbar dense={true}>
        <q-space />
        <q-btn
          icon="delete"
          flat={true}
          round={true}
          dense={true}
          on-click={() => (this.showRemoveConfirm = true)}>
          <q-tooltip>Remove image</q-tooltip>
        </q-btn>
      </q-toolbar>
    )
    const toolBarWrapperStyle = {
      padding: 0,
      top: '-50px',
      transition: 'top 0.2s cubic-bezier(0.82, 0.085, 0.395, 0.895)',
    }

    const removeConfirm = this.showRemoveConfirm ? (
      <div
        class="z-top absolute-full"
        style={{
          background: 'rgba(0,0,0,0.57)',
        }}>
        <div class="q-gutter-sm row fit row inline wrap justify-center items-center content-center">
          <q-btn icon="close" round={true} outline={true} />
          <q-btn icon="delete" round={true} color="negative" />
        </div>
      </div>
    ) : undefined

    return (
      <q-card
        flat={true}
        bordered={true}
        dark={true}
        class="bg-grey-7"
        on-mouseover={this.mouseover}
        on-mouseleave={this.mouseleave}>
        {removeConfirm}
        <q-img
          src={`https://placeimg.com/500/300/nature?t=` + Math.random()}
          spinner-color="white"
          ratio={this.ratio}>
          <div ref="toolbarWrapper" class="absolute-top" style={toolBarWrapperStyle}>
            {toolbar}
          </div>
          {title}
        </q-img>
        {removeConfirm}
      </q-card>
    )
  },
})
