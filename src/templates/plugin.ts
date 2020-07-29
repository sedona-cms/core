import { Plugin } from '@nuxt/types'
import { AdminLoader } from './admin-loader'

const sedonPLugin: Plugin = (context, inject) => {
  const adminLoader = new AdminLoader()

  inject('adminLoader', adminLoader)
  context.$adminLoader = {
    load: () => adminLoader.load(true),
  }
}

export default sedonPLugin
