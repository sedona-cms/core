import { customAlphabet } from 'nanoid'

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 10)

/**
 * Generate unique identifier
 *
 * @exports
 * @returns {string} short unique id
 */
export function generateId(): string {
  return nanoid()
}
