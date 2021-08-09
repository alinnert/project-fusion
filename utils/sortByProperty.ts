export function sortByProperty<T>(
  property: keyof T,
): (itemA: T, itemB: T) => -1 | 0 | 1 {
  return (itemA, itemB) => {
    if (itemA[property] < itemB[property]) return -1
    if (itemA[property] > itemB[property]) return 1
    return 0
  }
}
