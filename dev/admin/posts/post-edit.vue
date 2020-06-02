<template>
  <div class="q-pa-md q-gutter-md">
    <q-input v-model="form.title" label="Post Title" dark outlined />
    <q-input v-model="form.excerpt" type="textarea" label="Post excerpt" dark outlined />
  </div>
</template>

<script>
  import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'

  export default {
    name: 'PostEdit',
    data() {
      return {
        form: {
          title: '',
          excerpt: '',
        },
      }
    },
    watch: {
      form: {
        deep: true,
        handler() {
          eventBus.emit('core:save-disable', false)
        },
      },
    },
    mounted() {
      eventBus.on('core:save-click', this.save)
      eventBus.emit('core:save-disable', true)
    },
    beforeDestroy() {
      eventBus.off('core:save-click', this.save)
    },
    methods: {
      async save() {
        eventBus.emit('core:save-loading', true)
        return new Promise(resolve => {
          const timeout = setTimeout(() => {
            clearTimeout(timeout)
            eventBus.emit('core:save-loading', false)
            resolve()
          }, 5000)
        })
      },
    },
  }
</script>
