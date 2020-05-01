import Vue, { VNode, PropType } from 'vue'

type Link = {
  title: string
  href: string
}

export default Vue.extend({
  name: 'LinksEditor',
  props: {
    items: {
      type: Array as PropType<Link[]>,
      required: true,
    },
  },
  render(): VNode {
    return <div>Links Editor</div>
  },
})
