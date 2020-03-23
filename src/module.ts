import * as path from 'path'
import { Module } from '@nuxt/types'
import { uid } from 'quasar'
import { loadConfigFile } from './utils/config'

export const meta = require('../package.json')

const defaultOptions: ModuleConfig = {
  items: [],
}

const adminModule: Module<ModuleConfig> = async function (moduleOptions) {
  this.extendBuild(config => {
    config.node = {
      fs: 'empty',
    }
  })

  /* if (this.options.build === undefined) {
        this.options.build = {
            transpile: [ meta.name ],
        }
    } else if (Array.isArray(this.options.build.transpile)) {
        this.options.build.transpile.push(meta.name)
    } else {
        this.options.build.transpile = [ meta.name ]
    } */

  // @ts-ignore
  if (Array.isArray(this.options.build.transpile)) {
    // @ts-ignore
    this.options.build.transpile.push(meta.name)
  } else {
    // @ts-ignore
    this.options.build.transpile = [meta.name]
  }

  let options: ModuleConfig
  if (moduleOptions === undefined || (typeof moduleOptions === 'object' && Object.keys(moduleOptions).length === 0)) {
    options = await loadConfigFile(this.options.rootDir || process.cwd())
    options = Object.assign({}, defaultOptions, options)
  } else {
    options = Object.assign({}, defaultOptions, moduleOptions)
  }

  options.items = options.items.map(item => {
    return {
      id: uid(),
      ...item,
    }
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/quasar.js'),
    fileName: path.join('nuxt-admin', 'quasar.js'),
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/admin-loader.js'),
    fileName: path.join('nuxt-admin', 'admin-loader.js'),
  })

  this.addTemplate({
    src: path.resolve(__dirname, 'templates/sedona.js'),
    fileName: path.join('nuxt-admin', 'sedona.js'),
  })

  // Plugins

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/plugin.js'),
    fileName: path.join('nuxt-admin', 'plugin.admin.js'),
    mode: 'client',
    options,
  })
}

export default adminModule
