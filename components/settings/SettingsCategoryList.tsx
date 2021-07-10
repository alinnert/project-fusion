import React, { FC, useMemo } from 'react'
import { LinkListPrefixedItems, VerticalLinkList } from '../ui/VerticalLinkList'

interface Props {
  currentId: string
}

export const SettingsCategoryList: FC<Props> = ({ currentId }) => {
  const items = useMemo<LinkListPrefixedItems>(() => {
    return [
      { id: 'sections', name: 'Bereiche' },
      { id: 'links', name: 'URLs' },
    ]
  }, [])

  return (
    <VerticalLinkList
      prefixedItems={items}
      urlPrefix="/config/"
      currentId={currentId}
    />
  )
}
