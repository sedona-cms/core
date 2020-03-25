import { Context } from '@nuxt/types'
import { adminLoader } from './admin-loader'

const options: ModuleConfig = JSON.parse('<%= JSON.stringify(options) %>')

export default async function (context: Context, inject: Function): Promise<void> {
  inject('adminLoader', adminLoader)
  context['$adminLoader'] = adminLoader
}
