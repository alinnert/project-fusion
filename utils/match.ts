export const defaultMatch: unique symbol = Symbol('default match')

interface DefaultMatch<T> {
  [defaultMatch]: T
}

export const matchStringToString = <T extends string | number>(
  value: T,
  choices: Record<T, string> & DefaultMatch<string>,
): string => choices[value] ?? choices[defaultMatch]

export const matchUnionToString = <T extends string | number>(
  value: T,
  choices: Record<T, string>,
): string => choices[value] ?? ''

export const matchUnionToUnion = <T extends string | number, V extends string>(
  value: T,
  choices: Partial<Record<T, V>> & DefaultMatch<V>,
): V => choices[value] ?? choices[defaultMatch]

export const matchBoolToString = (
  value: boolean,
  whenTrue: string,
  whenFalse?: string,
): string => (value ? whenTrue : whenFalse ?? '')

export const matchBool = <T>(
  value: boolean,
  whenTrue: T,
  whenFalse?: T,
): T | null => (value ? whenTrue : whenFalse ?? null)
