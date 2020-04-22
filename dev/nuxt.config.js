export default {
  rootDir: 'dev',

  modules: ['@nuxt/http', ['../lib/module.js', {}]],

  buildModules: ['@getsedona/nuxt-sedona'],

  sedona: {
    components: ['page', 'scene', 'feature'],
  },

  plugins: [{ src: '~/plugins/admin', mode: 'client' }],

  // watch: ['../lib/*.js', '../lib/**/*.js']

  build: {
    extractCSS: true,
  },
}
