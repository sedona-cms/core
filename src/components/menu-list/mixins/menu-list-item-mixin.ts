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
  },
})
