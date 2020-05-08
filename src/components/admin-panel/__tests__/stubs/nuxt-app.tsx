import Vue, { VNode } from 'vue'

export default Vue.extend({
  name: 'NuxtApp',
  render(): VNode {
    return (
      <div id="__nuxt">
        <div id="__layout">Content</div>
      </div>
    )
  },
})
