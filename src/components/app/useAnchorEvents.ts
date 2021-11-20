import { useCallback, useEffect } from 'react'

export function useAnchorEvents() {
  const handleBodyClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.tagName.toLowerCase() !== 'a') return

    const href = target.getAttribute('href')
    if (href === null) return
    if (href.trim() === '') return

    event.preventDefault()
    globalThis.open(href, '_blank')
  }, [])

  useEffect(() => {
    globalThis.document.body.addEventListener('click', handleBodyClick)

    return () => {
      globalThis.document.body.removeEventListener('click', handleBodyClick)
    }
  }, [handleBodyClick])
}
