import path from 'path'
import fs from 'fs'
import { getOptions } from 'loader-utils'
import { loader } from 'webpack'

type Route = {
  name: string
  path: string
  component: string // full path to component file
  chunkName: string
}

type MenuItem = {
  title: string
  type: string
  component: string
}

const menuLoader: loader.Loader = function (source) {
  const callback = this.async()
  if (callback === undefined) throw new Error('async callback is undefined')

  const options = getOptions(this)
  const rootDir = String(options['rootDir'])
  const menuItemsPath = path.resolve(rootDir, '.nuxt', 'admin', 'menu-items.json')
  const routesPath = path.resolve(rootDir, '.nuxt', 'routes.json')

  this.cacheable(false)

  const routes: Route[] = JSON.parse(
    fs.existsSync(routesPath) ? fs.readFileSync(routesPath).toString() : '{}'
  )

  const menuItems: Record<string, MenuItem[]> = JSON.parse(
    fs.existsSync(menuItemsPath) ? fs.readFileSync(menuItemsPath).toString() : '{}'
  )

  const route = routes.find(routeItem => routeItem.component === this.resourcePath)
  if (route === undefined) {
    throw new Error(`MenuLoader :: route with component ${this.resourcePath} not found`)
  }

  menuItems[route.name] = JSON.parse(source.toString())
  fs.writeFileSync(menuItemsPath, JSON.stringify(menuItems))

  callback(undefined, '')
}

export default menuLoader
