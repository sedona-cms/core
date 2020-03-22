import Vue from 'vue'
import { Context } from '@nuxt/types'
import { load, unload } from './admin-loader'

const options: ModuleConfig = JSON.parse('<%= JSON.stringify(options) %>')

export default async function (context: Context, inject: Function): Promise<void> {

    inject('adminLoader', {
        load: () => load(context, options),
        unload: () => unload(context),
    })
    context['$adminLoader'] = {
        load: () => load(context, options),
        unload: () => unload(context),
    }
}
