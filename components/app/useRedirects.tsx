import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { hasCurrentFileHandle } from '../../redux/database/currentFileStorage'

interface RedirectTarget {
  path: string
  replace?: boolean
}

export function useRedirects() {
  const router = useRouter()
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const [hasCurrentFile, setHasCurrentFile] = useState<boolean>(true)

  useEffect(() => {
    async function run() {
      const result = await hasCurrentFileHandle()
      setHasCurrentFile(result)
    }
    run()
  }, [])

  const pageAvailableWithoutOpenFile = useMemo(() => {
    const pathnamesAvailableWithoutOpenFile: string[] = ['/', '/info']
    return pathnamesAvailableWithoutOpenFile.includes(router.pathname)
  }, [router.pathname])

  const redirectTarget = useMemo<RedirectTarget | null>(() => {
    // If no file is open:
    // Redirect: (path that requires file to be open) => /
    if (!hasCurrentFile && !pageAvailableWithoutOpenFile) {
      return { path: '/', replace: true }
    }

    // If file is open:
    // Redirect: / => /favorites
    if (isFileOpen && router.pathname === '/') {
      return { path: '/favorites', replace: true }
    }

    return null
  }, [
    hasCurrentFile,
    isFileOpen,
    pageAvailableWithoutOpenFile,
    router.pathname,
  ])

  useEffect(() => {
    if (redirectTarget === null) return

    if (redirectTarget.replace) {
      router.replace(redirectTarget.path)
    } else {
      router.push(redirectTarget.path)
    }
  }, [redirectTarget, router])
}
