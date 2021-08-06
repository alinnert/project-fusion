import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useAppSelector } from '../redux'
import { selectIsFileOpen } from '../redux/database'

interface RedirectTarget {
  path: string
  replace?: boolean
}

export function useRedirects() {
  const router = useRouter()
  const isFileOpen = useAppSelector(selectIsFileOpen)

  const pageAvailableWithoutOpenFile = useMemo(() => {
    const pathnamesAvailableWithoutOpenFile: string[] = ['/', '/info']

    console.log(router.pathname)

    return pathnamesAvailableWithoutOpenFile.includes(router.pathname)
  }, [router.pathname])

  const redirectTarget = useMemo<RedirectTarget | null>(() => {
    if (!isFileOpen && !pageAvailableWithoutOpenFile) {
      return { path: '/', replace: true }
    }

    return null
  }, [isFileOpen, pageAvailableWithoutOpenFile])

  useEffect(() => {
    if (redirectTarget === null) return

    if (redirectTarget.replace) {
      router.replace(redirectTarget.path)
    } else {
      router.push(redirectTarget.path)
    }
  }, [redirectTarget, router])
}
