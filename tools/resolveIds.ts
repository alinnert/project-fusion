export function resolveIds<T>(
  ids: string[],
  items: Record<string, T | undefined>,
): T[] {
  const result: T[] = []

  for (const id of ids) {
    const item = items[id]
    if (item === undefined) continue
    result.push(item)
  }

  return result
}
