import path from 'path'
import fs from 'fs'
import { getOptions } from 'loader-utils'
import { loader } from 'webpack'

const menuLoader: loader.Loader = function (source) {
  const callback = this.async()
  if (callback === undefined) throw new Error('async callback is undefined')

  const options = getOptions(this)
  const rootDir = String(options['rootDir'])
  const metaFilePath = path.resolve(rootDir, '.nuxt', 'sedona.json')

  const resourcePath = this.resourcePath.replace(rootDir, '').replace(/^\//, '').trim()

  this.addDependency(metaFilePath)
  this.cacheable(false)

  const fileData = JSON.parse(
    fs.existsSync(metaFilePath) ? fs.readFileSync(metaFilePath).toString() : '{}'
  )
  fileData[resourcePath] = JSON.parse(source.toString())

  fs.writeFileSync(metaFilePath, JSON.stringify(fileData))
  callback(undefined, '')
}

export default menuLoader
