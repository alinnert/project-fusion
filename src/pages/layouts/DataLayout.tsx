import React, { FC } from 'react'
import { Outlet } from 'react-router'
import { AppLayout } from '../../components/app/AppLayout'
import { GroupList } from '../../components/groups/GroupList'

export const DataLayout: FC = () => {
  return (
    <AppLayout left={<GroupList />}>
      <Outlet />
    </AppLayout>
  )
}
