<template>
  <div>
    <q-toolbar>
      <q-btn icon="add" flat round dense @click="newPost" />
      <q-btn icon="code" flat round dense @click="metaPost" />
      <q-space />
      <q-btn icon="fullscreen" flat round dense @click="openFullScreen" />
    </q-toolbar>
    <div class="q-ma-md">
      <posts-table />
    </div>
  </div>
</template>

<script>
  import PostsTable from './components/posts-table'
  import PostMeta from './components/post-meta'

  export default {
    name: 'PostView',
    components: {
      PostsTable,
    },
    methods: {
      newPost() {
        this.$sedona.navigate.goSection([
          {
            title: 'Regular Post',
            icon: 'post_add',
            component: 'posts/components/regular-post-form',
          },
          {
            title: 'Page',
            component: 'posts/components/page-form',
            params: {
              text: 'New page text',
            },
          },
        ])
      },
      metaPost() {
        this.$sedona.navigate.go(
          'posts/components/post-meta',
          { postId: 'post-id' },
          { save: true }
        )
      },
      openFullScreen() {
        this.$sedona.modal.show(PostsTable, {
          title: 'Posts',
          fullScreen: true,
        })
      },
    },
  }
</script>
