<template>
  <div class="q-pa-md">
    Page Post
    <br />
    {{ text }}
  </div>
</template>

<script>
  export default {
    name: 'PageForm',
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  }
</script>
