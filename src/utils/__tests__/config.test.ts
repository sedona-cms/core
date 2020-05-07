import * as path from 'path'
import { loadConfigFile, setIdToMenuItems } from '../config'

type MenuItem = {
  id?: string
  title?: string
  subTitle?: string
  icon?: string
  type: 'item' | 'section'
  component: string | Function
  params?: {
    [key: string]: any
  }
  items?: MenuItem[]
}

function testMenuItem(item: MenuItem): void {
  expect(item).toHaveProperty('id')
  if (item.items === undefined) return

  expect(item.items).toBeInstanceOf(Array)
  item.items.map(testMenuItem)
}

test('it can load config file', async () => {
  const config = await loadConfigFile(path.resolve(__dirname, 'stubs'))

  expect(config).toBeInstanceOf(Object)
  expect(config).toHaveProperty('toolbar')
  expect(config).toHaveProperty('items')
  expect(config.items).toBeInstanceOf(Array)
})

test('it can return exception with worong path', () => {
  expect(loadConfigFile(path.resolve(__dirname, 'wrong-path'))).rejects.toThrow()
})

test('it can set id to all menu items', async () => {
  const config = await loadConfigFile(path.resolve(__dirname, 'stubs'))
  expect(config).toHaveProperty('items')

  const items = setIdToMenuItems(config.items)
  items.map(testMenuItem)
})
