<template>
  <div class="q-pa-md">
    <q-btn label="Twitter Meta" color="primary" class="full-width" dark @click="modalTwitter" />
    <q-btn
      label="Facebook Meta"
      color="primary"
      class="full-width q-mt-sm"
      @click="modalFacebook"
    />
    <div class="q-mt-md">
      SEO form
    </div>
  </div>
</template>

<script>
  import TwitterForm from './twitter-form'

  export default {
    name: 'SiteSeo',
    methods: {
      modalTwitter() {
        this.$sedona.modal(TwitterForm, {
          title: 'Twitter Meta',
        })
      },
      modalFacebook() {
        this.$sedona.modal(
          'seo/facebook-form',
          {
            title: 'Facebook',
          },
          {
            currentPageId: 'm579mpje5t',
          }
        )
      },
    },
  }
</script>
