<template>
  <div>
    <the-tweeter-feed />

    <the-features />
  </div>
</template>

<script>
  import TheTweeterFeed from '~/components/TheTweeterFeed'
  import TheFeatures from '~/components/TheFeatures'

  export default {
    name: 'HomePage',
    components: { TheTweeterFeed, TheFeatures },
  }
</script>
