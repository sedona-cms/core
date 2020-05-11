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
  render(): VNode {
    const toolbarButtons = this.$slots['buttons'] ?? (
      <q-btn icon="delete" flat={true} round={true} dense={true} />
    )
    const toolbar = this.$slots['toolbar'] ?? (
      <q-toolbar dense={true}>
        <q-space />
        <q-btn icon="delete" flat={true} round={true} dense={true} />
      </q-toolbar>
    )

    return (
      <q-card flat={true} bordered={true} dark={true} class="bg-grey-7">
        <q-card-section className="q-pa-none">{toolbar}</q-card-section>
        <q-video src={this.src} ratio={this.ratio} />
      </q-card>
    )
  },
})
