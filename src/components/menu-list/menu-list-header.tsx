import Vue, { VNode, PropType, CreateElement } from 'vue'

export default Vue.extend({
  name: 'MenuListHeader',
  functional: true,
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  render(_h: CreateElement, { props }): VNode {
    return <q-item-label header={true}>{props.title}</q-item-label>
  },
})
