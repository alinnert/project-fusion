import { FC, PropsWithChildren } from 'react'
import { useAnchorEvents } from './useAnchorEvents'
import { usePersistedFileHandle } from './usePersistedFileHandle'
import { useRedirects } from './useRedirects'

interface Props {}

export const WrappedApp: FC<PropsWithChildren<Props>> = ({ children }) => {
  usePersistedFileHandle()
  useRedirects()
  useAnchorEvents()

  return <>{children}</>
}
