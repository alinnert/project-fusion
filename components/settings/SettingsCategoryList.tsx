import React, { FC, useMemo } from 'react'
import {
  CategorizedLinkItems, VerticalLinkList
} from '../ui/VerticalLinkList'

interface Props {
  currentId: string
}

export const SettingsCategoryList: FC<Props> = ({ currentId }) => {
  const items = useMemo<CategorizedLinkItems>(() => {
    return [
      [
        { id: 'foo', name: 'Einstellungen' },
        [
          { id: 'sections', name: 'Bereiche' },
          { id: 'links', name: 'URLs' },
        ],
      ],
    ]
  }, [])

  return (
    <VerticalLinkList
      items={items}
      urlPrefix="/config/"
      currentId={currentId}
    />
  )
}
