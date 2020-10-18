import path from 'path'
import fs from 'fs'
import Ajv from 'ajv'
import { generateId } from './nanoid'

import menuItemConditionSchema from '../schema/menu-item-condition.schema.json'
import menuItemSchema from '../schema/menu-item.schema.json'
import configSchema from '../schema/sedona.config.schema.json'
import savePanelSchema from '../schema/save-panel.schema.json'

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
    if (item.type === 'section' && Array.isArray(item.items)) {
      item.items = setIdToMenuItems(item.items)
    }
    return item
  })
}

function validateConfigFile(data: string): void {
  const ajv = new Ajv({
    extendRefs: true,
  })
  ajv.addMetaSchema(menuItemSchema, 'menu-item.schema.json')
  ajv.addMetaSchema(menuItemConditionSchema, 'menu-item-condition.schema.json')
  ajv.addMetaSchema(savePanelSchema, 'save-panel.schema.json')

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
