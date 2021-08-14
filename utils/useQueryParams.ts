import { useRouter } from 'next/router'
import { useMemo } from 'react'

type RecordFromKeys<T extends string[], V> = {
  [key in T[number]]: V
}

export function useQueryParam(param: string): string | undefined {
  const router = useRouter()

  const value = useMemo<string | undefined>(() => {
    const paramValue = router.query[param]

    if (paramValue === undefined) return
    if (Array.isArray(paramValue)) return paramValue[0]
    return paramValue
  }, [param, router.query])

  return value
}

export function useQueryParams<N extends string[]>(
  ...paramNames: N
): RecordFromKeys<N, string> {
  const router = useRouter()

  const queryParams = useMemo<RecordFromKeys<N, string>>(() => {
    const obj: Partial<RecordFromKeys<N, string>> = {}

    for (const paramName of paramNames) {
      const value = router.query[paramName]
      Reflect.defineProperty(obj, paramName, { value })
    }

    return obj as RecordFromKeys<N, string>
  }, [paramNames, router.query])

  return queryParams
}
