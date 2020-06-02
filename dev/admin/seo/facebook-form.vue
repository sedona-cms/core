<template>
  <div class="q-pa-md q-gutter-md">
    <div>Facebook Form</div>
    <br />
    <div>
      Current page id: <b>{{ currentPageId }}</b>
    </div>

    <div>
      <q-btn label="Loading" color="primary" class="full-width" @click="setLoading" />
    </div>

    <div>
      <q-btn label="Disable" color="primary" class="full-width" @click="setDisable" />
    </div>

    <div>
      <q-btn label="Close" color="primary" class="full-width" @click="close" />
    </div>
  </div>
</template>

<script>
  import { eventBus } from '@sedona-cms/core/lib/utils/event-bus'

  export default {
    name: 'FacebookForm',
    props: {
      currentPageId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        loading: false,
        disable: false,
      }
    },
    methods: {
      setLoading() {
        this.loading = !this.loading
        eventBus.emit('core:save-loading', this.loading)
      },
      setDisable() {
        this.disable = !this.disable
        eventBus.emit('core:save-disable', this.disable)
      },
      close() {
        eventBus.emit('core:modal-close')
      },
    },
  }
</script>
