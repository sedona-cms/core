<template>
  <div class="q-pa-md">
    <q-btn label="Twitter Meta" color="primary" class="full-width" dark @click="modalTwitter" />
    <q-btn
      label="Facebook Meta"
      color="primary"
      class="full-width q-mt-sm"
      @click="modalFacebook"
    />
    <div class="q-mt-md">SEO form</div>
  </div>
</template>

<script>
  import TwitterForm from './twitter-form'

  export default {
    name: 'SiteSeo',
    methods: {
      modalTwitter() {
        this.$sedona.modal.show(TwitterForm, {
          title: 'Twitter Meta',
        })
      },
      modalFacebook() {
        this.$sedona.modal.show(
          'seo/facebook-form',
          {
            title: 'Facebook',
            save: {
              label: 'OK',
            },
          },
          {
            currentPageId: 'm579mpje5t',
          }
        )
      },
    },
  }
</script>
