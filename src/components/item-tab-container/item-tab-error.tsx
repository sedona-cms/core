import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'AdminItemTabError',
  functional: true,
  render(): VNode {
    return <div class="q-pa-lg text-red">Component Loading Error</div>
  },
})
