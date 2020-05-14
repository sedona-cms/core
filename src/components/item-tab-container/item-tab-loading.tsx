import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'AdminItemTabLoading',
  data() {
    return {
      height: 0 as number,
    }
  },
  mounted(): void {
    const adminPanel = window.$admin.$el
    this.height = adminPanel.clientHeight - 120
  },
  render(): VNode {
    if (this.height === 0) {
      return <div>&nbsp;</div>
    }

    return (
      <div class="relative-position" style={{ height: `${this.height}px` }}>
        <q-circular-progress
          indeterminate={true}
          size="40px"
          thickness={0.4}
          font-size="50px"
          color="lime"
          track-color="grey-3"
          center-color="grey-8"
          class="absolute-center"
        />
      </div>
    )
  },
})
