export const defaultMatch: unique symbol = Symbol('default match')

interface DefaultMatch<T> {
  [defaultMatch]: T
}

export function matchString<T extends string | number>(
  value: T,
  choices: Record<T, string> & DefaultMatch<string>,
): string {
  return choices[value] ?? choices[defaultMatch]
}

export function matchUnion<T extends string | number, V extends string>(
  value: T,
  choices: Partial<Record<T, V>> & DefaultMatch<V>,
): V {
  return choices[value] ?? choices[defaultMatch]
}

export function matchBool(
  value: boolean,
  whenTrue: string,
  whenFalse?: string,
): string {
  return value ? whenTrue : whenFalse ?? ''
}
