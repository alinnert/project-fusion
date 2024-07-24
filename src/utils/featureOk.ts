import { useMemo } from 'react'

export function useFeatureOk(): boolean {
  const featureOk = useMemo<boolean>(() => {
    if (typeof showOpenFilePicker !== 'function') return false

    return true
  }, [])

  return featureOk
}
