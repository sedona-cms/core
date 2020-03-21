export default {
    rootDir: 'dev',

    modules: [
        [
            '../lib/module.js',
            {
                items: [
                ]
            }
        ],
        [
            '@getsedona/nuxt-sedona',
            {
                components: ['card', 'feature'],
            }
        ]
    ],

    plugins: [
        { src: '~/plugins/admin', mode: 'client' }
    ],

    // watch: ['../lib/*.js', '../lib/**/*.js']
}
