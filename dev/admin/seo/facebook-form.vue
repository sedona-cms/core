<template>
  <div class="q-pa-md">
    Facebook Form
    <br />
    <br />
    Current page id: <b>{{ currentPageId }}</b>
  </div>
</template>

<script>
  export default {
    name: 'FacebookForm',
    props: {
      currentPageId: {
        type: String,
        required: true,
      },
    },
  }
</script>
