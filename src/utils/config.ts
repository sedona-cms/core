import * as path from 'path'
import * as fs from 'fs'

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
