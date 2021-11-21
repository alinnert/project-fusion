export function isDefined<T>(
  predicate: T | undefined | null,
): predicate is NonNullable<T> {
  return predicate !== undefined && predicate !== null
}
