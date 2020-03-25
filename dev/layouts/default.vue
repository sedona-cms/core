<template>
  <div>
    <scene view="box">
      <ul>
        <li v-for="[path, title] in menuItems" :key="path">
          <template v-if="$route.path === path">
            {{ title }}
          </template>
          <template v-else>
            <nuxt-link :to="{ path, query: { loggedIn: isLogged } }">{{ title }}</nuxt-link>
          </template>
        </li>
        <li>
          <a href="#" @click.prevent="load">Load admin panel</a>
        </li>
      </ul>
      {{ isLogged }}
    </scene>
    <nuxt />
  </div>
</template>

<script>
  const menuItems = [
    ['/', 'Home'],
    ['/about', 'About'],
  ]

  export default {
    name: 'DefaultLayout',
    data() {
      return {
        menuItems,
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
