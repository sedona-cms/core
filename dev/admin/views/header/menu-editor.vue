<template>
  <div>
    <links-editor :items="menuItems" @change="menuChange" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { LinksEditor } from '@sedona-cms/core/lib/components'

  export default {
    name: 'MenuEditor',
    components: {
      LinksEditor,
    },
    computed: {
      ...mapState(['menuItems']),
    },
    methods: {
      menuChange({ items }) {
        this.$store.commit('SET_MENU', { items })
      },
    },
  }
</script>
