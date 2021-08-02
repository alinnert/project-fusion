import React, { FC } from 'react'
import { VerticalLinkList } from '../ui/VerticalLinkList'
import { useSettings } from './useSettings'

interface Props {
  currentId: string
}

export const SettingsPagesList: FC<Props> = ({ currentId }) => {
  const { settingsItems } = useSettings()

  return (
    <VerticalLinkList
      items={settingsItems}
      urlPrefix="/config/"
      showIcons
      currentId={currentId}
    />
  )
}
