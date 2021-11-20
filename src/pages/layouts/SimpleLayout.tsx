import React, { FC } from 'react'
import { Outlet } from 'react-router'
import { AppLayout } from '../../components/app/AppLayout'

export const SimpleLayout: FC = ({}) => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
