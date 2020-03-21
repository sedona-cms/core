import Vue from 'vue'
import {load, unload} from './admin-loader'

export default async function (context, inject) {
    inject('adminLoader', {
        load: () => load(context),
        unload: () => unload(context),
    })
    context.$adminLoader = {
        load: () => load(context),
        unload: () => unload(context),
    }
}
