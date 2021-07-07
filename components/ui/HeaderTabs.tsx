import { useRouter } from 'next/router'
import React, { FC, ReactElement } from 'react'
import { HeaderButton } from './HeaderButton'

export interface TabItem {
  label: string
  icon?: ReactElement
  href: string
  current: boolean
}

interface Props {
  tabs: Array<TabItem>
}

export const HeaderTabs: FC<Props> = ({ tabs }) => {
  const router = useRouter()

  function handleItemClick(tab: TabItem) {
    router.push(tab.href)
  }

  return (
    <div className="flex gap-x-1">
      {tabs.map((tab) => (
        <div key={tab.href} onClick={() => handleItemClick(tab)}>
          <HeaderButton current={tab.current} icon={tab.icon}>
            {tab.label}
          </HeaderButton>
        </div>
      ))}
    </div>
  )
}
