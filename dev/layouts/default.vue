<template>
    <div style="padding-left:350px">
        <a href="#" @click.prevent="load">Load admin</a>
        <nuxt />
    </div>
</template>

<script>
    import { RouterPanel  } from '@sedona-cms/core/lib/components'

    export default {
        name: 'DefaultLayout',
        components: {
            RouterPanel,
        },
        methods: {
          async load() {
              await this.$adminLoader.load()
          }
        },
    }
</script>
