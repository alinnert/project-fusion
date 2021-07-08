export function match<T extends string>(
  value: T,
  choices: Record<T, string>,
): string {
  return choices[value] ?? ''
}
