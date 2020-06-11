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
          this.$sedona.lockNavigate()
        },
      },
    },
    mounted() {
      eventBus.on('core:save-click', this.save)
      eventBus.on('core:navigate', this.__checkForSave)

      eventBus.emit('core:save-disable', true)
    },
    beforeDestroy() {
      eventBus.off('core:save-click', this.save)
      eventBus.off('core:navigate', this.__checkForSave)
    },
    methods: {
      __checkForSave() {
        if (!this.$sedona.isNavigateLock) return
        const result = confirm('Save?')
        if (!result) {
          this.$sedona.unlockNavigate(true)
        }
      },
      async save() {
        eventBus.emit('core:save-loading', true)
        return new Promise(resolve => {
          const timeout = setTimeout(() => {
            clearTimeout(timeout)
            eventBus.emit('core:save-loading', false)
            eventBus.emit('core:save-disable', true)
            this.$sedona.unlockNavigate()
            resolve()
          }, 5000)
        })
      },
    },
  }
</script>
