import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { useAnchorEvents } from './useAnchorEvents'

export const App: FC = () => {
  useAnchorEvents()

  return <Outlet />
}
