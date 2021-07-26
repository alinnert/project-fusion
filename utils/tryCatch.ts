export type TryCatchResult<T> =
  | { caught: false; value: T }
  | { caught: true; error: Error }

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }
  if (typeof error === 'string') {
    return new Error(error)
  }
  return new Error('unknown error')
}

export async function asyncTry<T>(
  getValue: () => Promise<T>,
): Promise<TryCatchResult<T>> {
  try {
    return { caught: false, value: await getValue() }
  } catch (error: unknown) {
    return { caught: true, error: normalizeError(error) }
  }
}

export function tryCatch<T>(getValue: () => T): TryCatchResult<T> {
  try {
    return { caught: false, value: getValue() }
  } catch (error: unknown) {
    return { caught: true, error: normalizeError(error) }
  }
}
