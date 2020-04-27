<template>
  <div id="wrapper" class="has-text-centered-mobile">
    <the-hero />

    <nuxt />

    <the-newsletter />

    <the-footer />
  </div>
</template>

<script>
  import TheHero from '~/components/TheHero'
  import TheNewsletter from '~/components/TheNewsletter'
  import TheFooter from '~/components/TheFooter'

  export default {
    name: 'DefaultLayout',
    components: {
      TheHero,
      TheNewsletter,
      TheFooter,
    },
  }
</script>
