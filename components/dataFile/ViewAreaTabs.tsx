import { CogIcon, CollectionIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useAppSelector } from '../../redux'
import { selectIsFileOpen } from '../../redux/database'
import { HeaderTabs, TabItem } from '../ui/HeaderTabs'

interface Props {}

export const ViewAreaTabs: FC<Props> = ({}) => {
  const router = useRouter()
  const isFileOpen = useAppSelector(selectIsFileOpen)

  const isConfigPage = useMemo(() => {
    return router.pathname.startsWith('/config')
  }, [router.pathname])

  const tabs = useMemo<Array<TabItem>>(
    () => [
      {
        label: 'Daten',
        icon: <CollectionIcon />,
        href: '/favorites',
        current: !isConfigPage,
      },
      {
        label: 'Konfiguration',
        icon: <CogIcon />,
        href: '/config',
        current: isConfigPage,
      },
    ],
    [isConfigPage],
  )

  if (!isFileOpen) return null

  return (
    <div className="mx-8">
      <HeaderTabs tabs={tabs} />
    </div>
  )
}
