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
          <template v-for="item in menuItems">
            <nuxt-link
              :key="item.id"
              :to="{ path: item.href, query: { loggedIn: isLogged } }"
              class="a-menu is-size-7 navbar-item"
            >
              {{ item.title }}
            </nuxt-link>
          </template>
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
  import { mapState } from 'vuex'

  export default {
    name: 'TheNavbar',
    data() {
      return {
        isLogged: false,
      }
    },
    computed: {
      ...mapState(['menuItems']),
    },
    mounted() {
      this.isLogged = location.search === '?loggedIn=true'
    },
  }
</script>
