<template>
  <section id="hero" class="hero is-medium">
    <div class="hero-head">
      <the-navbar />
    </div>

    <div v-if="$route.name === 'index'" class="hero-body">
      <div class="container">
        <h1 class="has-text-green is-size-1 is-size-3-mobile">
          An engaging headline
        </h1>
        <p class="has-text-green">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
          accusam et justo duo dolores et ea rebum.
        </p>
        <button v-if="!isLogged" class="btn has-mustard-bg is-size-7 a-menu" @click="load">
          try it now
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import TheNavbar from '~/components/TheNavbar'

  export default {
    name: 'TheHero',
    components: {
      TheNavbar,
    },
    data() {
      return {
        isLogged: false,
      }
    },
    mounted() {
      this.isLogged = location.search === '?loggedIn=true'
    },
    methods: {
      async load() {
        window.history.pushState('', '', `${location.href}?loggedIn=true`)
        await this.$adminLoader.load()
        this.isLogged = true
      },
    },
  }
</script>
