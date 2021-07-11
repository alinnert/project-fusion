export function match<T extends string | number>(
  value: T,
  choices: Record<T, string>,
): string {
  return choices[value] ?? ''
}

export function matchBool(
  value: boolean,
  whenTrue: string,
  whenFalse?: string,
): string {
  return value ? whenTrue : whenFalse ?? ''
}
