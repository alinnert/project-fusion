import React, { FC, ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Button } from '../forms/Button'

export type TabItem = {
  label: string
  icon?: ReactElement
  href: string
  current?: boolean
}

type Props = {
  tabs: Array<TabItem>
}

export const HeaderTabs: FC<Props> = ({ tabs }) => {
  const location = useLocation()
  const navigate = useNavigate()

  function isCurrent(tab: TabItem) {
    if (tab.current !== undefined) return tab.current
    return location.pathname.startsWith(tab.href)
  }

  function handleItemClick(tab: TabItem) {
    navigate(tab.href)
  }

  return (
    <div className="flex gap-x-2">
      {tabs.map((tab) => (
        <div key={tab.href} onClick={() => handleItemClick(tab)}>
          <Button
            type={isCurrent(tab) ? 'header-current' : 'header'}
            icon={tab.icon}
            iconType="mini"
          >
            {tab.label}
          </Button>
        </div>
      ))}
    </div>
  )
}
