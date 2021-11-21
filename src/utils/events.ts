import { useCallback, useEffect } from 'react'

type KeyboardEventHandler = (event: KeyboardEvent) => void

export function useGlobalKeyDown(callback: KeyboardEventHandler): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      callback(event)
    },
    [callback],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}
