<template>
  <div>
    <links-editor :items="[]" />
  </div>
</template>

<script>
  import { LinksEditor } from '@sedona-cms/core/lib/components'

  export default {
    name: 'MenuEditor',
    components: {
      LinksEditor,
    },
  }
</script>
