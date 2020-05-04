import { generateId } from '../nanoid'

test('it can generate a valid id', () => {
  const id = generateId()

  expect(id).toHaveLength(10)
  expect(id).toEqual(expect.stringMatching(/([\da-z]){10}/gm))
})
