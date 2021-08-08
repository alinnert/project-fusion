import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { HeaderTabs, TabItem } from '../ui/HeaderTabs'

interface Props {}

export const ViewAreaTabs: FC<Props> = ({}) => {
  const router = useRouter()
  const isFileOpen = useAppSelector(selectIsFileOpen)
  const { t } = useTranslation()

  const tabs = useMemo<Array<TabItem>>(() => {
    const dataItem: TabItem = {
      label: t('header.tabs.data'),
      icon: <CollectionIcon />,
      href: '/favorites',
      current:
        router.pathname.startsWith('/favorites') ||
        router.pathname.startsWith('/groups'),
    }

    const configItem: TabItem = {
      label: t('header.tabs.config'),
      icon: <CogIcon />,
      href: '/config',
    }

    const startItem: TabItem = {
      label: t('header.tabs.home'),
      icon: <HomeIcon />,
      href: '/',
      current: router.pathname === '/',
    }

    const infoItem: TabItem = {
      label: t('header.tabs.info'),
      icon: <InformationCircleIcon />,
      href: '/info',
    }

    return isFileOpen ? [dataItem, configItem, infoItem] : [startItem, infoItem]
  }, [isFileOpen, router.pathname, t])

  return <HeaderTabs tabs={tabs} />
}
