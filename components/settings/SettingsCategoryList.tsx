import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { LinkItem, VerticalLinkList } from '../ui/VerticalLinkList'

interface Props {
  currentId: string
}

export const SettingsCategoryList: FC<Props> = ({ currentId }) => {
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
      currentId={currentId}
    />
  )
}
