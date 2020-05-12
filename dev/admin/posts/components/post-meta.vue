<template>
  <div class="q-pa-md">
    Post Meta
    <br />
    <b>Post ID:</b> {{ postId }}
  </div>
</template>

<script>
  export default {
    name: 'PostMeta',
    props: {
      postId: {
        type: String,
        required: true,
      },
    },
  }
</script>
