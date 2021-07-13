import { customAlphabet } from 'nanoid'

const customNanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz', 8)

export function createId(): string {
  return customNanoId()
}
