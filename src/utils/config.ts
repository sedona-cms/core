import * as path from 'path'
import * as fs from 'fs'
import { generateId } from './nanoid'

/**
 * Load sedona.config.json from root directory
 *
 * @param {string} rootPath path to src directory
 * @returns {Promise<ModuleConfig>} config object
 */
export async function loadConfigFile(rootPath: string): Promise<ModuleConfig> {
  const configFile = path.resolve(rootPath, 'sedona.config.json')
  if (fs.existsSync(configFile)) {
    const data = await require(`${configFile}`)
    return JSON.parse(JSON.stringify(data))
  }
  throw new Error(`Sedona CMS config file not found in ${configFile}`)
}

export function setIdToMenuItems(items: MenuItem[]): MenuItem[] {
  return items.map(item => {
    if (item.id === undefined) {
      item.id = generateId()
    }
    if (Array.isArray(item.items)) {
      item.items = setIdToMenuItems(item.items)
    }
    return item
  })
}
