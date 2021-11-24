import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'

interface RedirectTarget {
  path: string
  replace?: boolean
}

export function useRedirects() {
  const location = useLocation()
  const navigate = useNavigate()

  const isFileOpen = useAppSelector(selectIsFileOpen)

  const pageAvailableWithoutOpenFile = useMemo(() => {
    const pathnamesAvailableWithoutOpenFile: string[] = [
      '/',
      '/info',
      '/config',
      '/config/interface',
    ]
    return pathnamesAvailableWithoutOpenFile.includes(location.pathname)
  }, [location.pathname])

  const redirectTarget = useMemo<RedirectTarget | null>(() => {
    // If no file is open:
    // Redirect: (path that requires file to be open) => /
    if (!isFileOpen && !pageAvailableWithoutOpenFile) {
      return { path: '/', replace: true }
    }

    // If file is open:
    // Redirect: / => /groups
    if (
      isFileOpen &&
      (location.pathname === '/' || location.pathname === '/groups')
    ) {
      return { path: `/groups`, replace: true }
    }

    return null
  }, [isFileOpen, pageAvailableWithoutOpenFile, location.pathname])

  useEffect(() => {
    if (redirectTarget === null) return
    navigate(redirectTarget.path, { replace: redirectTarget.replace })
  }, [navigate, redirectTarget])
}
