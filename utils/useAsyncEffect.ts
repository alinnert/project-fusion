import { useEffect } from 'react'

export function useAsyncEffect(callback: () => void): void {
  useEffect(() => {
    async function run() {
      callback()
    }
    run()
  }, [callback])
}
