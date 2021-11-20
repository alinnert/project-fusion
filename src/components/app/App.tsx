import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAnchorEvents } from './useAnchorEvents'
import { usePersistedFileHandle } from './usePersistedFileHandle'

export const App: FC = () => {
  usePersistedFileHandle()
  useAnchorEvents()

  return <Outlet />
}
