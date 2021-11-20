import { useEffect, useRef, useState } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
// @ts-expect-error Config needs to be a JS file.
import config from '../../tailwind.config'

export const tailwindConfig = resolveConfig(config)

export function useBreakpoint(breakpoint?: string): boolean {
  const breakpointMatch = useRef<MediaQueryList | null>(null)
  const [matches, setMatches] = useState<boolean>(
    () => breakpointMatch.current?.matches ?? false,
  )

  useEffect(() => {
    breakpointMatch.current = matchMedia(
      `screen and (min-width: ${breakpoint})`,
    )
  }, [breakpoint])

  useEffect(() => {
    setMatches(breakpointMatch.current?.matches ?? false)
  }, [breakpointMatch])

  useEffect(() => {
    breakpointMatch.current?.addEventListener('change', handleMediaChange)

    return () => {
      breakpointMatch.current?.removeEventListener('change', handleMediaChange)
    }
  }, [breakpoint, breakpointMatch])

  function handleMediaChange(event: MediaQueryListEvent): void {
    setMatches(event.matches)
  }

  return breakpoint === undefined ? false : matches
}
