import { SortOrder } from '../redux/settings/SortOrder'

export type SortByPropertyOptions = {
  direction: SortOrder
}

export function sortByProperty<T>(
  getProperty: (item: T) => string,
  options: SortByPropertyOptions = { direction: 'ascending' },
): (itemA: T, itemB: T) => number {
  const ascending = options.direction === 'ascending'
  return (itemA, itemB) => {
    const result = getProperty(itemA).localeCompare(
      getProperty(itemB),
      undefined,
      { numeric: true, sensitivity: 'base' },
    )
    return ascending ? result : result * -1
  }
}
