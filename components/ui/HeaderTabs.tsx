import { useRouter } from 'next/router'
import React, { FC, ReactElement } from 'react'
import { Button } from './Button'

export interface TabItem {
  label: string
  icon?: ReactElement
  href: string
  current?: boolean
}

interface Props {
  tabs: Array<TabItem>
}

export const HeaderTabs: FC<Props> = ({ tabs }) => {
  const router = useRouter()

  function isCurrent(tab: TabItem) {
    if (tab.current !== undefined) return tab.current
    return router.pathname.startsWith(tab.href)
  }

  function handleItemClick(tab: TabItem) {
    router.push(tab.href)
  }

  return (
    <div className="flex gap-x-1">
      {tabs.map((tab) => (
        <div key={tab.href} onClick={() => handleItemClick(tab)}>
          <Button
            buttonType={isCurrent(tab) ? 'header-current' : 'header'}
            icon={tab.icon}
          >
            {tab.label}
          </Button>
        </div>
      ))}
    </div>
  )
}
