import { LinkIcon, TagIcon } from '@heroicons/react/solid'
import React, { FC, useMemo } from 'react'
import { CategorizedLinkItems, VerticalLinkList } from '../ui/VerticalLinkList'

interface Props {
  currentId: string
}

export const SettingsCategoryList: FC<Props> = ({ currentId }) => {
  const items = useMemo<CategorizedLinkItems>(() => {
    return [
      [
        { id: 'foo', name: 'Datenbank' },
        [
          {
            id: 'categories',
            name: 'Kategorien',
            icon: <TagIcon />,
            iconColor: 'saddlebrown',
          },
          {
            id: 'links',
            name: 'URLs',
            icon: <LinkIcon />,
            iconColor: 'dodgerblue',
          },
        ],
      ],
    ]
  }, [])

  return (
    <VerticalLinkList
      items={items}
      urlPrefix="/config/"
      showIcons
      currentId={currentId}
    />
  )
}
