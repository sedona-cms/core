import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'AdminItemTabLoading',
  functional: true,
  render(): VNode {
    return (
      <div class="fit column items-center justify-center">
        <q-circular-progress
          indeterminate={true}
          size="40px"
          thickness={0.4}
          font-size="50px"
          color="lime"
          track-color="grey-3"
          center-color="grey-8"
          cclass="q-ma-md"
        />
      </div>
    )
  },
})
