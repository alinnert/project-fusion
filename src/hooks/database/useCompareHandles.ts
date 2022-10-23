import { useCallback } from 'react'

type UseCompareHandlesResult = (
  handlesA: FileSystemFileHandle[],
  handlesB: FileSystemFileHandle[],
) => boolean

export function useCompareHandles(): UseCompareHandlesResult {
  return useCallback((handlesA, handlesB) => {
    if (handlesA.length !== handlesB.length) return false
    const mismatch = handlesA.some((handle, index) => {
      return handle !== handlesB[index]
    })
    return !mismatch
  }, [])
}
