<template>
  <div class="q-pa-md">
    Form
  </div>
</template>

<script>
  import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'

  export default {
    name: 'PostEdit',
    mounted() {
      eventBus.on('core:save-click', this.save)
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
