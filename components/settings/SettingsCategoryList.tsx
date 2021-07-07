import React, { FC, useMemo } from 'react'
import { LinkItem, VerticalLinkList } from '../ui/VerticalLinkList'

interface Props {}

export const SettingsCategoryList: FC<Props> = ({}) => {
  const items = useMemo<Array<LinkItem>>(() => {
    return [
      { id: 'sections', name: 'Bereiche' },
      { id: 'links', name: 'URLs' },
    ]
  }, [])

  return (
    <VerticalLinkList
      items={items}
      createLink={(item) => `/config/${item.id}`}
    />
  )
}
