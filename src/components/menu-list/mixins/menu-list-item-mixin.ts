import Vue, { PropType } from 'vue'

export const menuListItemMixin = Vue.extend({
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
    subTitle: {
      type: String as PropType<string>,
      required: true,
    },
    icon: {
      type: String as PropType<string>,
      required: true,
    },
    type: {
      type: String as PropType<'item' | 'section' | 'header'>,
      validator: value => ['item', 'section', 'header'].includes(value),
    },
  },
})
