import { EntityId } from '@reduxjs/toolkit'

export function createUniqueGroupId(
  baseId: string,
  groupIds: EntityId[],
): string {
  if (!groupIds.includes(baseId)) return baseId

  let counter = 0
  let newId = ''

  while (true) {
    counter += 1
    newId = `${baseId}-${counter}`
    if (!groupIds.includes(newId)) break
  }

  return newId
}
