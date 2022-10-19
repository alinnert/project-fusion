import {
  Cog6ToothIcon,
  HomeIcon,
  InformationCircleIcon,
  RectangleStackIcon,
} from '@heroicons/react/20/solid'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { HeaderTabs, TabItem } from '../ui/header/HeaderTabs'

export const AppTabs: FC = ({}) => {
  const { t } = useTranslation(translationNamespaces)
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
    const dataItem: TabItem = {
      label: t('common:header.tabs.data'),
      icon: <RectangleStackIcon />,
      href: groupHref,
      current: location.pathname.startsWith('/groups'),
    }

    const configItem: TabItem = {
      label: t('common:header.tabs.config'),
      icon: <Cog6ToothIcon />,
      href: configHref,
      current: location.pathname.startsWith('/config'),
    }

    const startItem: TabItem = {
      label: t('common:header.tabs.home'),
      icon: <HomeIcon />,
      href: '/',
      current: location.pathname === '/',
    }

    const infoItem: TabItem = {
      label: t('common:header.tabs.info'),
      icon: <InformationCircleIcon />,
      href: '/info',
    }

    return isFileOpen
      ? [dataItem, configItem, infoItem]
      : [startItem, configItem, infoItem]
  }, [configHref, groupHref, isFileOpen, location.pathname, t])

  return <HeaderTabs tabs={tabs} />
}
