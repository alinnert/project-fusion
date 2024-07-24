import React, { FC } from 'react'
import { DashboardEditForm } from '../../components/dashboard/DashboardEditForm'
import { useAppSelector } from '../../redux'

export const EditDashboard: FC = () => {
  const dashboard = useAppSelector((state) => state.dashboard)

  return <DashboardEditForm dashboard={dashboard} />
}
