export function swapArrayElements<T>(
  array: Array<T>,
  index: number,
  direction: 'up' | 'down',
): boolean {
  if (index < 0 || index >= array.length) return false

  const coIndex = direction === 'up' ? index + 1 : index - 1
  if (coIndex < 0 || coIndex >= array.length) return false

  const coValue = array[index]
  array[index] = array[coIndex]
  array[coIndex] = coValue

  return true
}
