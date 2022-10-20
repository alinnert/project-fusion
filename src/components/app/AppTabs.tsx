import {
  CircleStackIcon,
  Cog6ToothIcon,
  DocumentIcon,
} from '@heroicons/react/20/solid'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { HeaderTabs, TabItem } from '../ui/header/HeaderTabs'

export const AppTabs: FC = ({}) => {
  const { t } = useTranslation()
  const location = useLocation()

  const isFileOpen = useAppSelector(selectIsFileOpen)
  const currentGroupId = useAppSelector((state) => state.uiState.currentGroupId)
  const currentConfigId = useAppSelector(
    (state) => state.uiState.currentConfigId,
  )

  const groupHref = useMemo(() => {
    return currentGroupId === null ? `/groups` : `/groups/${currentGroupId}`
  }, [currentGroupId])

  const configHref = useMemo(() => {
    return currentConfigId === null
      ? `/config/interface`
      : `/config/${currentConfigId}`
  }, [currentConfigId])

  const tabs = useMemo<Array<TabItem>>(() => {
    const startItem: TabItem = {
      label: t('common:header.tabs.home'),
      icon: <DocumentIcon />,
      href: '/',
      current: location.pathname === '/',
    }

    const dataItem: TabItem = {
      label: t('common:header.tabs.data'),
      icon: <CircleStackIcon />,
      href: groupHref,
      current: location.pathname.startsWith('/groups'),
    }

    const configItem: TabItem = {
      label: t('common:header.tabs.config'),
      icon: <Cog6ToothIcon />,
      href: configHref,
      current: location.pathname.startsWith('/config'),
    }

    return isFileOpen
      ? [startItem, dataItem, configItem]
      : [startItem, configItem]
  }, [configHref, groupHref, isFileOpen, location.pathname, t])

  return <HeaderTabs tabs={tabs} />
}
