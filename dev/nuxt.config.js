export default {
  rootDir: 'dev',

  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Calistoga|Open+Sans&display=swap',
      },
    ],
  },

  css: ['~assets/css/styles.css'],

  modules: ['@nuxt/http', '../lib/module.js'],

  buildModules: ['@nuxtjs/bulma'],

  plugins: [{ src: '~/plugins/admin', mode: 'client' }],

  // watch: ['../lib/*.js', '../lib/**/*.js']

  build: {
    extractCSS: true,
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
}
