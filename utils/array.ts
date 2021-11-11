export function swapArrayElements<T>(
  array: Array<T>,
  index: number,
  direction: 'up' | 'down',
): boolean {
  if (index < 0 || index >= array.length) return false

  const coIndex = direction === 'up' ? index + 1 : index - 1
  if (coIndex < 0 || coIndex >= array.length) return false

  const coValue = array[index]
  // @ts-ignore
  array[index] = array[coIndex]
  // @ts-ignore
  array[coIndex] = coValue

  return true
}

export function removeElementsFromArray(
  array: Array<unknown>,
  ...itemsToRemove: Array<unknown>
): void {
  for (const item of itemsToRemove) {
    while (array.includes(item)) {
      array.splice(array.indexOf(item), 1)
    }
  }
}
