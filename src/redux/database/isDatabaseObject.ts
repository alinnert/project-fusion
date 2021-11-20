import { Database } from './index'

export function isDatabaseObject(value: unknown): value is Database {
  if (typeof value !== 'object' || value === null) return false

  const shapedValue = value as Record<keyof Database, unknown>

  if (typeof shapedValue.categories !== 'object') return false
  if (shapedValue.categories === null) return false
  if (typeof shapedValue.groups !== 'object') return false
  if (shapedValue.groups === null) return false
  if (typeof shapedValue.projects !== 'object') return false
  if (shapedValue.projects === null) return false

  if (typeof shapedValue.settings !== 'object') return false
  if (shapedValue.settings === null) return false

  if (
    !Array.isArray(
      (shapedValue.settings as { categoryOrder?: unknown }).categoryOrder,
    )
  ) {
    return false
  }

  if (
    typeof (shapedValue.settings as { primaryProjectLink?: unknown })
      .primaryProjectLink !== 'object'
  ) {
    return false
  }

  if (
    !Array.isArray(
      (shapedValue.settings as { projectLinks?: unknown }).projectLinks,
    )
  ) {
    return false
  }

  return true
}
