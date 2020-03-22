<template>
    <div>
        <a href="#" @click.prevent="load">Load admin</a>
        <nuxt />
    </div>
</template>

<script>
    export default {
        name: 'DefaultLayout',
        methods: {
          async load() {
              await this.$adminLoader.load()
          }
        },
    }
</script>
