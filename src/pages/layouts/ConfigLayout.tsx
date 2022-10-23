import React, { FC, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router'
import { AppLayout } from '../../components/app/AppLayout'
import { SettingsPagesList } from '../../components/settings/SettingsPagesList'

export const ConfigLayout: FC = () => {
  const location = useLocation()

  const currentId = useMemo(() => {
    if (!location.pathname.startsWith('/config/')) return ''
    return location.pathname.replace(/^\/config\//, '')
  }, [location.pathname])

  return (
    <AppLayout left={<SettingsPagesList currentId={currentId} />}>
      <Outlet />
    </AppLayout>
  )
}
