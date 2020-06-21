import { Context } from '@nuxt/types'
import { AdminLoader } from './admin-loader'

export default async function (context: Context, inject: Function): Promise<void> {
  const adminLoader = new AdminLoader()

  inject('adminLoader', adminLoader)
  context.$adminLoader = {
    load: () => adminLoader.load(true),
  }
}
