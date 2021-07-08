export function match<T extends string | number>(
  value: T,
  choices: Record<T, string>,
): string {
  return choices[value] ?? ''
}
