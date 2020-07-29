/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const prefixwrap = require('postcss-prefixwrap')
const remove = require('postcss-remove-rules')
const pkg = require('quasar/package.json')

const sourceFile = path.resolve(__dirname, '../node_modules/quasar/dist/quasar.css')

console.log('Source file:', sourceFile)
console.log('Quasar version:', pkg.version)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function main() {
  fs.readFile(sourceFile, (error, code) => {
    // eslint-disable-next-line promise/catch-or-return,promise/no-promise-in-callback
    postcss([
      prefixwrap('.admin-panel', {
        prefixRootTags: false,
        ignoredSelectors: [
          ':root',
          /\.desktop(.+)/,
          /\.mobile(.+)/,
          /\.cordova(.+)/,
          /\.electron(.+)/,
          /\.ios(.+)/,
          /\.mat(.+)/,
          /\.touch(.+)/,
          /\.within-iframe(.+)/,
          /\.platform-ios(.+)/,
          /\.platform-android(.+)/,
          /\.q-(.+)/,
          /\.q-focus-helper(.+)/,
          /(\.fullscreen|\.absolute-full|\.fixed-full)/,
          /\.no-pointer-events/,
          /(.+)#q-app(.+)/,
        ],
      }),
      remove({
        rulesToRemove: {
          '.admin-panel.body--dark': '*',
          '.admin-panel, .admin-panel': '*',
          '.admin-panel, .admin-panel, .admin-panel #q-app': '*',
          'body.platform-ios.within-iframe, body.platform-ios.within-iframe #q-app': '*',
          'body.electron .q-electron-drag': '*',
          'body.electron .q-electron-drag .q-btn-item, body.electron .q-electron-drag--exception':
            '*',
          '.admin-panel code, .admin-panel kbd, .admin-panel pre, .admin-panel samp': '*',
          '.admin-panel hr': '*',
          '.admin-panel button, .admin-panel input, .admin-panel optgroup, .admin-panel select, .admin-panel textarea':
            '*',
          '.admin-panel optgroup': '*',
        },
      }),
    ])
      .process(code, { from: sourceFile, to: 'dist/quasar.css' })
      .then(result => {
        const css = result.css.replace(/body\.desktop/g, 'body')
        const destinationPath = path.resolve(__dirname, '../lib/assets/css')
        if (!fs.existsSync(destinationPath)) {
          fs.mkdirSync(destinationPath, { recursive: true })
        }

        fs.writeFile('lib/assets/css/quasar.css', css, () => {
          console.log('Result:', path.resolve(__dirname, '../lib/assets/css/quasar.css'))
          return true
        })

        if (result.map) {
          fs.writeFile('dist/quasar.css.map', result.map, () => true)
        }

        return true
      })
  })
}

main()
