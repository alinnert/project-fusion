import { CogIcon, CollectionIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux'
import { HeaderTabs, TabItem } from '../ui/HeaderTabs'

interface Props {}

export const ViewAreaTabs: FC<Props> = ({}) => {
  const router = useRouter()
  const fileData = useSelector((state: AppState) => state.dataFile.fileData)

  const isConfigPage = useMemo(() => {
    return router.pathname.startsWith('/config')
  }, [router.pathname])

  const tabs = useMemo<Array<TabItem>>(
    () => [
      {
        label: 'Daten',
        icon: <CollectionIcon />,
        href: '/groups',
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

  if (fileData === null) return null

  return (
    <div className="mx-8">
      <HeaderTabs tabs={tabs} />
    </div>
  )
}
