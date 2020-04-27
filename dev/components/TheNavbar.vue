<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link :to="{ path: '/', query: { loggedIn: isLogged } }" class="navbar-item">
          <h3 class="logo has-text-green is-size-4">
            Sedona CMS
          </h3>
        </nuxt-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <nuxt-link
            :to="{ path: '/', query: { loggedIn: isLogged } }"
            class="a-menu is-size-7 navbar-item"
          >
            home
          </nuxt-link>

          <nuxt-link
            :to="{ path: '/about', query: { loggedIn: isLogged } }"
            class="a-menu is-size-7 navbar-item"
          >
            about
          </nuxt-link>

          <nuxt-link
            :to="{ path: '/features', query: { loggedIn: isLogged } }"
            class="a-menu is-size-7 navbar-item"
          >
            features
          </nuxt-link>
        </div>
      </div>
      <span class="navbar-burger burger" data-target="navbarMenuHeroA">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'TheNavbar',
    data() {
      return {
        isLogged: false,
      }
    },
    mounted() {
      this.isLogged = location.search === '?loggedIn=true'
    },
  }
</script>
