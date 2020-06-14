import { Context } from '@nuxt/types'
import { adminLoader } from './admin-loader'

export default async function (context: Context, inject: Function): Promise<void> {
  inject('adminLoader', adminLoader)
  context.$adminLoader = {
    load: () => adminLoader.load(true),
  }
}
