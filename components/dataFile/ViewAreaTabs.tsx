import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { HeaderTabs, TabItem } from '../ui/HeaderTabs'

interface Props {}

export const ViewAreaTabs: FC<Props> = ({}) => {
  const router = useRouter()
  const isFileOpen = useAppSelector(selectIsFileOpen)

  const tabs = useMemo<Array<TabItem>>(() => {
    const dataItem: TabItem = {
      label: 'Daten',
      icon: <CollectionIcon />,
      href: '/favorites',
      current:
        router.pathname.startsWith('/favorites') ||
        router.pathname.startsWith('/groups'),
    }

    const configItem: TabItem = {
      label: 'Einstellungen',
      icon: <CogIcon />,
      href: '/config',
    }

    const startItem: TabItem = {
      label: 'Willkommen',
      href: '/',
      icon: <HomeIcon />,
      current: router.pathname === '/',
    }

    const infoItem: TabItem = {
      label: 'Info',
      icon: <InformationCircleIcon />,
      href: '/info',
    }

    return isFileOpen ? [dataItem, configItem, infoItem] : [startItem, infoItem]
  }, [isFileOpen, router.pathname])

  return (
    <div>
      <HeaderTabs tabs={tabs} />
    </div>
  )
}
