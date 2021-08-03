import { useEffect, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import config from '../tailwind.config'

export const tailwindConfig = resolveConfig(config)

export function useBreakpoint(breakpoint: string | undefined): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const match = window.matchMedia(`screen and (min-width: ${breakpoint})`)
    setMatches(match.matches)
    match.addEventListener('change', handleMediaChange)

    return () => {
      match.removeEventListener('change', handleMediaChange)
    }
  }, [breakpoint])

  function handleMediaChange(event: MediaQueryListEvent) {
    setMatches(event.matches)
  }

  if (breakpoint === undefined) return false

  return matches
}
