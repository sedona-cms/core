<template>
  <div class="q-pa-md">
    Facebook Form
    <br />
    <br />
    Current page id: <b>{{ currentPageId }}</b>
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
    mounted() {
      eventBus.on('core:modal-submit', this.submitForm)
    },
    methods: {
      submitForm() {
        console.log('submit form')
        eventBus.emit('core:modal-close')
      },
    },
  }
</script>
