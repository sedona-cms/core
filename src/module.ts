import * as path from 'path'
import { Module } from '@nuxt/types'
import { loadConfigFile } from './utils/config'

export const meta = require('../package.json')

interface Options {
    a: boolean
    b: number
    c: string
}

const adminModule: Module<Options> = async function (moduleOptions) {
    this.extendBuild((config) => {
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


    const config = await loadConfigFile(this.options.rootDir || process.cwd())

    console.log(config)

    this.addTemplate({
        src: path.resolve(__dirname, 'templates/quasar.js'),
        fileName: path.join('nuxt-admin', 'quasar.js'),
    })
    this.addTemplate({
        src: path.resolve(__dirname, 'templates/admin-loader.js'),
        fileName: path.join('nuxt-admin', 'admin-loader.js'),
    })

    this.addTemplate({
        src: path.resolve(__dirname, '../lib/assets/css/quasar.css'),
        fileName: path.join('nuxt-admin', 'quasar.css'),
    })


    // Plugins

    this.addPlugin({
        src: path.resolve(__dirname, 'templates/plugin.js'),
        fileName: path.join('nuxt-admin', 'plugin.admin.js'),
        options: {},
    })
}

export default adminModule
