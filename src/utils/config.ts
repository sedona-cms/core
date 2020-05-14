import * as path from 'path'
import * as fs from 'fs'
import Ajv from 'ajv'
import { generateId } from './nanoid'
import configSchema from '../schema/sedona.config.schema.json'

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
    validateConfigFile(data)
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

function validateConfigFile(data: string): void {
  const ajv = new Ajv()
  const validate = ajv.compile(configSchema)
  const valid = validate(data)
  if (!valid && Array.isArray(validate.errors)) {
    const message = ['Schema Config Validation Error']
    validate.errors.forEach(error => {
      message.push(`data: ${error.dataPath}`)
      message.push(`schema: ${error.schemaPath}`)
      message.push(`message: ${error.message}`)
    })
    throw new Error(message.join(`\n`))
  }
}
