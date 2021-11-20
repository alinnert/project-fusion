import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import React, { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { translationNamespaces } from '../../utils/i18next-namespaces'
import { specialGroupIds } from '../groups/GroupList'
import { HeaderTabs, TabItem } from '../ui/HeaderTabs'

export const AppTabs: FC = ({}) => {
  const { t } = useTranslation(translationNamespaces)
  const location = useLocation()

  const isFileOpen = useAppSelector(selectIsFileOpen)
  const currentGroupId = useAppSelector((state) => state.uiState.currentGroupId)
  const currentConfigId = useAppSelector(
    (state) => state.uiState.currentConfigId,
  )

  const groupHref = useMemo(() => {
    return currentGroupId === null
      ? `/groups/${specialGroupIds.favorites}`
      : `/groups/${currentGroupId}`
  }, [currentGroupId])

  const configHref = useMemo(() => {
    return currentConfigId === null
      ? `/config/interface`
      : `/config/${currentConfigId}`
  }, [currentConfigId])

  const tabs = useMemo<Array<TabItem>>(() => {
    const dataItem: TabItem = {
      label: t('header.tabs.data'),
      icon: <CollectionIcon />,
      href: groupHref,
      current: location.pathname.startsWith('/groups'),
    }

    const configItem: TabItem = {
      label: t('header.tabs.config'),
      icon: <CogIcon />,
      href: configHref,
    }

    const startItem: TabItem = {
      label: t('header.tabs.home'),
      icon: <HomeIcon />,
      href: '/',
      current: location.pathname === '/',
    }

    const infoItem: TabItem = {
      label: t('header.tabs.info'),
      icon: <InformationCircleIcon />,
      href: '/info',
    }

    return isFileOpen
      ? [dataItem, configItem, infoItem]
      : [startItem, configItem, infoItem]
  }, [isFileOpen, location.pathname, t])

  return <HeaderTabs tabs={tabs} />
}
