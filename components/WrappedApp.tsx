import { FC, PropsWithChildren } from 'react'
import { usePersistedFileHandle } from './usePersistedFileHandle'

interface Props {}

export const WrappedApp: FC<PropsWithChildren<Props>> = ({ children }) => {
  usePersistedFileHandle()

  return <>{children}</>
}
