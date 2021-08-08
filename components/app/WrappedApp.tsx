import { FC, PropsWithChildren } from 'react'
import { usePersistedFileHandle } from './usePersistedFileHandle'
import { useRedirects } from './useRedirects'

interface Props {}

export const WrappedApp: FC<PropsWithChildren<Props>> = ({ children }) => {
  usePersistedFileHandle()
  useRedirects()

  return <>{children}</>
}
