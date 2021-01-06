import path from 'path'
import { Module } from '@nuxt/types'
import { loadConfigFile, setIdToMenuItems } from './utils/config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const npmMeta = require('../package.json')

const defaultOptions: ModuleConfig = {
  items: [],
}

const adminModule: Module<ModuleConfig> = async function (moduleOptions) {
  this.extendBuild(config => {
    config.node = {
      fs: 'empty',
    }
  })

  this.extendBuild(config => {
    if (config.module === undefined) return
    if (config.name !== 'server') return

    const index = config.module.rules.findIndex(item => item.resourceQuery === /blockType=admin/)
    if (index >= 0) return

    config.module.rules.push({
      resourceQuery: /blockType=admin/,
      loader: path.resolve(__dirname, '../lib/loaders/menu-loader.js'),
      options: {
        rootDir: this.options.rootDir || process.cwd(),
      },
    })
  })

  if (typeof this.options.build === 'object') {
    if (Array.isArray(this.options.build.transpile)) {
      this.options.build.transpile.push(npmMeta.name)
    } else {
      this.options.build.transpile = [npmMeta.name]
    }
  }

  let options: ModuleConfig
  if (
    moduleOptions === undefined ||
    (typeof moduleOptions === 'object' && Object.keys(moduleOptions).length === 0)
  ) {
    options = await loadConfigFile(this.options.rootDir || process.cwd())
    options = Object.assign({}, defaultOptions, options)
  } else {
    options = Object.assign({}, defaultOptions, moduleOptions)
  }

  options.items = setIdToMenuItems(options.items)

  // Templates

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/quasar.js'),
    fileName: path.join('admin', 'quasar.js'),
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/admin-loader.js'),
    fileName: path.join('admin', 'admin-loader.js'),
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/sedona/config.js'),
    fileName: path.join('admin', 'sedona', 'config.js'),
    options,
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/sedona/modal.js'),
    fileName: path.join('admin', 'sedona', 'modal.js'),
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/sedona/navigate.js'),
    fileName: path.join('admin', 'sedona', 'navigate.js'),
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/sedona.js'),
    fileName: path.join('admin', 'sedona.js'),
    options,
  })

  // Plugins

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join('admin', 'plugin.js'),
    mode: 'client',
    options,
  })
}

export { npmMeta }

export default adminModule
