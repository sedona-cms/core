<template>
  <div>
    <q-toolbar>
      <q-btn icon="fullscreen" flat round dense @click="openFullScreen" />
    </q-toolbar>
    <div class="q-ma-md">
      <posts-table />
    </div>
  </div>
</template>

<script>
  import PostsTable from './posts-table'

  export default {
    name: 'PostView',
    components: {
      PostsTable,
    },
    methods: {
      openFullScreen() {
        this.$sedona.modal(PostsTable, {
          title: 'Posts',
          fullScreen: true,
        })
      },
    },
  }
</script>
